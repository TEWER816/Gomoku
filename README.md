# Gomoku Game 五子棋游戏

<div align="center">

[English](#english) | [中文](#中文)

</div>

---

## English

This is a Gomoku (Five in a Row) game built with React. The game features:

- Interactive game board
- Player vs AI functionality
- Win detection
- Responsive design
- Undo move capability
- Game state persistence
- Multiple difficulty levels (Easy, Medium, Hard)
- Time limits for each move
- Toast notifications for game events

### Installation 安装

1. Clone the repository 克隆仓库
   ```bash
   git clone https://github.com/TEWER816/Gomoku.git
   ```
2. Navigate to the project directory 进入项目目录
   ```bash
   cd gomoku-game
   ```
3. Install dependencies 安装依赖
   ```bash
   npm install
   ```
4. Start the development server 启动开发服务器
   ```bash
   npm start
   ```

### How to Play 游戏玩法

Players take turns placing stones on the board. The first player to get five stones in a row (horizontally, vertically, or diagonally) wins.

游戏玩法：玩家轮流在棋盘上放置棋子。第一个在横、竖或对角线上连成五子的玩家获胜。

### Features 功能特性

- **Player vs AI**: Challenge our intelligent AI opponent
- **Responsive Design**: Play on any device
- **Undo Functionality**: Correct your mistakes with the undo button
- **Game State Persistence**: Your game is saved automatically
- **Clean UI**: Intuitive and visually appealing interface
- **Multiple Difficulty Levels**: Choose from Easy, Medium, or Hard AI
  - Easy: AI makes more mistakes and thinks faster
  - Medium: Balanced gameplay
  - Hard: Challenging AI with deeper strategic thinking
- **Time Limits**: Each player has 30 seconds per turn
- **Notifications**: Game events are displayed with toast notifications

### Game Rules 游戏规则

- Players alternate turns placing stones on the board
- The first player to get five stones in a row wins
- The game ends when a player gets five in a row or the board is full
- Players can restart the game at any time using the restart button

### Technologies Used 技术栈

- React
- JavaScript
- CSS3
- HTML5

### AI Algorithm AI 算法

The AI uses a combination of:
- Minimax algorithm with Alpha-Beta pruning
- Heuristic evaluation function based on game patterns
- Different difficulty levels achieved by adjusting search depth and randomization

### Contributing 贡献

Contributions are welcome! Please feel free to submit a Pull Request.

欢迎贡献！请随时提交 Pull Request。

---

## 中文

这是一个使用 React 构建的五子棋游戏。游戏特色包括：

- 交互式游戏棋盘
- 玩家对战 AI 功能
- 胜负检测
- 响应式设计
- 悔棋功能
- 游戏状态持久化
- 多个难度级别（简单、中等、困难）
- 每步棋的时间限制
- 游戏事件的 Toast 通知

### 安装

1. 克隆仓库
   ```bash
   git clone https://github.com/TEWER816/Gomoku.git
   ```
2. 进入项目目录
   ```bash
   cd gomoku-game
   ```
3. 安装依赖
   ```bash
   npm install
   ```
4. 启动开发服务器
   ```bash
   npm start
   ```

### 游戏玩法

玩家轮流在棋盘上放置棋子。第一个在横、竖或对角线上连成五子的玩家获胜。

### 功能特性

- **玩家对战 AI**：与我们的智能 AI 对手对战
- **响应式设计**：在任何设备上都能畅玩
- **悔棋功能**：通过悔棋按钮纠正错误
- **游戏状态持久化**：游戏自动保存
- **简洁界面**：直观且美观的界面
- **多个难度级别**：选择简单、中等或困难 AI
  - 简单：AI 会犯更多错误且思考更快
  - 中等：平衡的游戏体验
  - 困难：具有深度战略思考的挑战性 AI
- **时间限制**：每个玩家每轮有 30 秒时间
- **通知功能**：游戏事件通过 Toast 通知显示

### 游戏规则

- 玩家轮流在棋盘上放置棋子
- 第一个连成五子的玩家获胜
- 当玩家连成五子或棋盘填满时游戏结束
- 玩家可以随时使用重新开始按钮重启游戏

### 技术栈

- React
- JavaScript
- CSS3
- HTML5

### AI 算法

AI 使用以下组合技术：
- 带 Alpha-Beta 剪枝的 Minimax 算法
- 基于游戏模式的启发式评估函数
- 通过调整搜索深度和随机化实现不同难度级别

### 贡献

欢迎贡献！请随时提交 Pull Request。