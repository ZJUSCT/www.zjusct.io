// src/main-widget.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import styleText from './index.css?inline'
import '@fontsource-variable/inter';

class ZJUSCTHomeElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const shadowRoot = this.shadowRoot!;

    const styleTag = document.createElement('style');
    styleTag.textContent = styleText;

    const resetStyle = document.createElement('style');
    resetStyle.textContent = `
      :host {
        all: initial;
        display: block;
        width: 100%;
        font-size: 16px;
        line-height: 1.5;
        font-family: 'Inter Variable', system-ui, sans-serif;
      }

      .zjusct-app-root {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      *, *::before, *::after {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-color: currentColor;
      }
    `;

    shadowRoot.appendChild(resetStyle);
    shadowRoot.appendChild(styleTag);

    const mountPoint = document.createElement('div');
    mountPoint.className = "zjusct-app-root font-sans antialiased";
    shadowRoot.appendChild(mountPoint);

    this.syncTheme(mountPoint);

    const observer = new MutationObserver(() => {
      this.syncTheme(mountPoint);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-md-color-scheme', 'data-theme']
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'data-md-color-scheme', 'data-theme']
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      this.syncTheme(mountPoint);
    });

    const root = ReactDOM.createRoot(mountPoint);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  syncTheme(element: HTMLElement) {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const hasDarkClass = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');

    const mdScheme = document.body.getAttribute('data-md-color-scheme') || document.documentElement.getAttribute('data-md-color-scheme');
    const isMdDark = mdScheme === 'slate' || mdScheme === 'dark';

    let isDark = false;

    if (hasDarkClass || isMdDark) {
      isDark = true;
    } else if (!mdScheme && !document.documentElement.className.includes('light')) {
      isDark = isSystemDark;
    }

    if (isDark) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }
}

// 注册自定义组件，防止重复注册报错
if (!customElements.get('zjusct-home')) {
  customElements.define('zjusct-home', ZJUSCTHomeElement);
}
