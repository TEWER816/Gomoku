# 五子棋游戏 (Gomoku Game)

一个基于React的五子棋游戏，具有AI对战功能和三种难度级别。

## 功能特性

- 三种难度级别：简单、中等、困难
- AI对战功能
- 计时系统
- 响应式设计，支持桌面和移动设备
- 简洁美观的UI界面

## 技术栈

- React
- JavaScript/ES6+
- CSS
- react-toastify (用于通知提示)

## 安装和运行

1. 克隆仓库：
   ```bash
   git clone https://github.com/[您的用户名]/gomoku-game.git
   ```

2. 安装依赖：
   ```bash
   cd gomoku-game
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm start
   ```

4. 访问 `http://localhost:3000` 开始游戏

## 构建生产版本

```bash
npm run build
```

构建后的文件会出现在 `build` 目录中，可部署到任何静态服务器。

## 部署

项目可以轻松部署到：
- GitHub Pages
- Netlify
- Vercel
- 任何支持静态文件的Web服务器

## 游戏说明

- 玩家执黑子，AI执白子
- 游戏目标是率先在横、竖或对角线上连成五子
- 每位玩家都有30秒的思考时间
- 游戏提供三种难度级别，可根据需要选择

## 项目结构

```
gomoku-game/
├── public/
├── src/
│   ├── components/
│   │   ├── Board.js
│   │   └── Board.css
│   ├── utils/
│   │   └── ai.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── build/
├── package.json
└── README.md
```