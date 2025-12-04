import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 构建为库模式或单个文件，这里为了方便 MkDocs 引用，我们构建为 IIFE
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main-widget.tsx'), // 注意：我们将创建一个新入口
      },
      output: {
        format: 'iife', // 立即执行函数，适合直接在 <script> 引用
        entryFileNames: 'assets/zjusct-widget.js',
        name: 'ZJUSCTWidget',
        // 确保 CSS 和 Assets 被内联（虽然我们将手动处理 CSS，但这是双重保险）
        inlineDynamicImports: true, 
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
  }
})