// postcss.config.js
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import remToPx from 'postcss-rem-to-pixel';

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    // 添加这个插件
    remToPx({
      rootValue: 16, // 告诉插件：我们的设计稿/开发环境是基于 16px 的
      propList: ['*'], // 转换所有属性（margin, padding, font-size 等）
      selectorBlackList: [], // 不排除任何选择器
      replace: true, // 替换原来的 rem，不保留
      mediaQuery: false, // 媒体查询中的 rem 通常不需要转换，或者根据需要开启
      minPixelValue: 0 // 所有 rem 都转换，哪怕很小
    })
  ],
}