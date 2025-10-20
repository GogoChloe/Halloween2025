# 🎃 万圣节网站 | Halloween Website

这是一个用 Next.js 构建的万圣节主题网站，具有恐怖的动画效果和互动元素。

## ✨ 功能特色

- 🎭 万圣节主题的暗色设计
- 👻 动态浮动的万圣节元素（蝙蝠、幽灵、蜘蛛）
- 🎃 互动式按钮与特效
- 💀 自定义万圣节光标
- 🌙 响应式设计，支持所有设备
- ⚡ 现代化的 CSS 动画和过渡效果

## 🚀 快速开始

首先，安装依赖：

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

然后运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 🛠️ 技术栈

- **Next.js 14+** - React 框架
- **Tailwind CSS** - 样式框架
- **JavaScript** - 编程语言
- **CSS Animations** - 自定义动画

## 📁 项目结构

```
src/
├── app/
│   ├── globals.css          # 全局样式和万圣节动画
│   ├── layout.js           # 应用布局
│   └── page.js             # 主页
└── components/
    ├── HalloweenBackground.js  # 背景动画组件
    └── SpookyButton.js        # 互动按钮组件
```

## 🎨 自定义组件

### HalloweenBackground
背景动画组件，包含：
- 浮动的蝙蝠
- 移动的蜘蛛
- 飘动的幽灵

### SpookyButton
特效按钮组件，具有：
- 悬浮缩放效果
- 点击闪光特效
- 随机恐怖消息

## 🌟 部署

最简单的部署方式是使用 [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

查看 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多详情。

## 📄 许可证

MIT License - 祝你万圣节快乐！ 🎃
