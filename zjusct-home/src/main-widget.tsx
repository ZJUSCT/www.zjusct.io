// src/main-widget.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import styleText from './index.css?inline' 
import '@fontsource-variable/inter';

class ZJUSCTHomeElement extends HTMLElement {
  constructor() {
    super();
    // 开启 Shadow DOM (open 模式允许 JS 访问)
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const shadowRoot = this.shadowRoot!;
    
    // 1. 注入编译好的 Tailwind CSS
    const styleTag = document.createElement('style');
    styleTag.textContent = styleText;
    
    // 2. 注入 Reset 样式和容器样式
    // 强制 :host 的字体大小为 16px，隔离外部样式干扰
    const resetStyle = document.createElement('style');
    resetStyle.textContent = `
      :host { 
        all: initial; /* 清除继承 */
        display: block; 
        width: 100%; 
        font-size: 16px; /* 强制基准字体大小 */
        line-height: 1.5; 
        font-family: 'Inter Variable', system-ui, sans-serif;
      }
      
      /* 内部应用容器 */
      .zjusct-app-root {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        /* 使用 CSS 变量背景色，实现平滑切换 */
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      /* 补充 Tailwind Preflight 在 ShadowDOM 中丢失的重置 */
      *, *::before, *::after { 
        box-sizing: border-box; 
        border-width: 0; 
        border-style: solid; 
        border-color: currentColor; /* 确保边框颜色跟随文字 */
      }
    `;

    shadowRoot.appendChild(resetStyle);
    shadowRoot.appendChild(styleTag);

    // 3. 创建 React 挂载点
    const mountPoint = document.createElement('div');
    mountPoint.className = "zjusct-app-root font-sans antialiased";
    shadowRoot.appendChild(mountPoint);

    // 4. 初始化主题同步逻辑
    this.syncTheme(mountPoint);

    // 5. 监听宿主环境变化（HTML/Body class 或属性变化）
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

    // 6. 监听系统深色模式偏好变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      this.syncTheme(mountPoint);
    });

    // 7. 渲染 React 应用
    const root = ReactDOM.createRoot(mountPoint);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  /**
   * 判断外部环境是否为暗色模式，并同步 class 到内部容器
   */
  syncTheme(element: HTMLElement) {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 检查宿主 HTML 或 Body 是否包含 'dark' 类 (标准 Tailwind)
    const hasDarkClass = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
    
    // 检查 MkDocs Material 的配色方案 ('slate' 通常为暗色)
    const mdScheme = document.body.getAttribute('data-md-color-scheme') || document.documentElement.getAttribute('data-md-color-scheme');
    const isMdDark = mdScheme === 'slate' || mdScheme === 'dark';

    // 综合判断逻辑
    let isDark = false;

    if (hasDarkClass || isMdDark) {
      isDark = true;
    } else if (!mdScheme && !document.documentElement.className.includes('light')) {
      // 如果没有明确指定亮色且没有框架属性，回退到系统偏好
      isDark = isSystemDark;
    }

    // 将 .dark 类应用到 Shadow DOM 内部的容器上
    // 这会触发 index.css 中定义的 .dark 变量覆盖
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