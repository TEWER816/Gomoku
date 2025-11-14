# 五子棋游戏开源到GitHub指南

## 第一步：在GitHub上创建仓库

1. 访问 [GitHub](https://github.com) 并登录您的账户
2. 点击右上角的 "+" 号，选择 "New repository"
3. 设置仓库信息：
   - Repository name: `gomoku-game` 或您喜欢的名称
   - Description: `一个基于React的五子棋游戏，支持三种难度级别`
   - 设置为 Public（公开）
   - 不要勾选 "Initialize this repository with a README"
   - 不要添加 .gitignore 或 license（我们已经准备好了）
4. 点击 "Create repository"

## 第二步：上传项目到GitHub（使用GitHub Desktop或手动方式）

### 方法一：使用GitHub Desktop（推荐）

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 登录您的GitHub账户
3. 在GitHub Desktop中选择 "File" → "Add Local Repository"
4. 选择 `D:\project\AI_dp\gomoku-game` 文件夹
5. 点击 "Publish repository"，连接到您刚才创建的远程仓库
6. 添加提交信息如 "Initial commit: Add Gomoku game"，然后点击 "Commit to main"
7. 点击 "Publish" 按钮上传到GitHub

### 方法二：手动上传（适用于没有安装Git的情况）

1. 在GitHub仓库页面，点击 "Add file" → "Upload files"
2. 将 `D:\project\AI_dp\gomoku-game` 文件夹中的所有文件拖拽到浏览器窗口
3. 在 "Commit changes" 部分添加描述，如 "Initial commit: Add Gomoku game"
4. 点击 "Commit changes" 按钮

## 第三步：验证上传

1. 检查GitHub仓库是否包含以下重要文件：
   - `package.json` - 项目配置文件
   - `src/` - 源代码目录
   - `public/` - 公共资源目录
   - `.gitignore` - Git忽略文件（我们已创建）
   - `RELEASE_NOTES.md` - 发布说明

## 第四步：创建README.md文件（在GitHub网页上）

1. 在GitHub仓库页面，点击 "Add file" → "Create new file"
2. 文件名输入 `README.md`
3. 在文件内容中添加以下内容：

```markdown
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
```

4. 点击 "Commit new file"

## 第五步：（可选）添加许可证

在GitHub仓库中创建 `LICENSE` 文件，选择合适的开源许可证（如MIT、Apache 2.0等）。

## 完成！

您的五子棋游戏现在已经成功开源到GitHub，全世界的开发者都可以访问、使用和改进您的代码了！

## 注意事项

- 项目已经构建完成，`build` 目录包含可部署的生产版本
- 项目不包含局域网对战功能，只包含人机对战
- AI算法支持三种难度级别，使用了优化的搜索算法