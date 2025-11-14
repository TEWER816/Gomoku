# 五子棋游戏发布说明

## 构建信息
- 构建时间：2025年11月14日
- 应用名称：五子棋游戏
- 版本：0.1.0

## 构建输出
构建文件位于 `build` 目录中，包含以下文件：
- `index.html` - 主页面文件
- `asset-manifest.json` - 资源清单文件
- `static/css/main.69e9ca95.css` - 样式文件
- `static/js/main.bad9cd50.js` - JavaScript代码

## 部署选项

### 1. 本地部署
您可以使用 `serve` 工具来本地部署：
```bash
npm install -g serve
serve -s build
```

### 2. 静态服务器部署
将 `build` 目录中的所有文件上传到任何支持静态文件的Web服务器。

### 3. GitHub Pages 部署
如果要部署到GitHub Pages，可以使用：
```bash
npm install --save-dev gh-pages
```

然后在 `package.json` 中添加：
```json
{
  "homepage": "https://<username>.github.io/<repository-name>",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

## 应用功能
- 三种难度级别：简单、中等、困难
- 计时功能：玩家和AI都有30秒思考时间
- 游戏提示：时间不足时会有警告提示
- 响应式设计：支持多种屏幕尺寸

## 系统要求
- 现代浏览器（Chrome, Firefox, Safari, Edge等）
- JavaScript支持
- 支持ES6+语法

## 文件大小
- JavaScript: 57.15 kB (压缩后)
- CSS: 3.77 kB (压缩后)

## 注意事项
- 应用为纯前端应用，无需后端服务
- 所有游戏逻辑都在客户端执行
- 不需要任何外部依赖