import React, { useState, useEffect } from 'react';
import { makeSmartAIMove } from '../utils/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Board.css';

const BOARD_SIZE = 15;

const Board = () => {
  // 初始化棋盘状态
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
  // 当前玩家 ('player' 表示玩家, 'ai' 表示AI)
  const [currentPlayer, setCurrentPlayer] = useState('player');
  // 游戏是否结束
  const [gameOver, setGameOver] = useState(false);
  // 获胜者
  const [winner, setWinner] = useState(null);
  // 玩家剩余时间 (秒)
  const [playerTimeLeft, setPlayerTimeLeft] = useState(30);
  // AI剩余时间 (秒)
  const [aiTimeLeft, setAiTimeLeft] = useState(30);
  // 游戏难度
  const [difficulty, setDifficulty] = useState('medium');

  // 计时器效果
  useEffect(() => {
    let timer;
    if (!gameOver) {
      timer = setInterval(() => {
        if (currentPlayer === 'player') {
          setPlayerTimeLeft(prev => {
            if (prev <= 1) {
              // 玩家超时，AI获胜
              setWinner('ai');
              setGameOver(true);
              toast.error('您的时间到！AI获胜！');
              return 0;
            }
            // 添加时间警告
            if (prev === 10 && prev > 1) {
              toast.warn('您的时间不多了！请尽快落子！');
            }
            return prev - 1;
          });
        } else {
          setAiTimeLeft(prev => {
            if (prev <= 1) {
              // AI超时，玩家获胜
              setWinner('player');
              setGameOver(true);
              toast.success('AI时间到！您获胜了！');
              return 0;
            }
            // 添加时间警告
            if (prev === 10 && prev > 1) {
              toast.warn('AI时间不多了！');
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentPlayer, gameOver]);

  // AI下棋效果
  useEffect(() => {
    if (currentPlayer === 'ai' && !gameOver) {
      // 根据难度设置AI思考时间
      let delay = 800; // 默认延迟
      if (difficulty === 'easy') {
        delay = 1200; // 简单难度延迟1.2秒
      } else if (difficulty === 'hard') {
        delay = 1800; // 困难难度延迟1.8秒，给AI更多时间但不会卡死
      }

      // 添加一个短暂的延迟，模拟AI思考时间
      const timer = setTimeout(() => {
        // 根据难度调整AI强度
        const aiMove = makeSmartAIMove(board, difficulty);
        if (aiMove) {
          handleAIMove(aiMove.row, aiMove.col);
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameOver, board, difficulty]);

  // 检查是否获胜
  const checkWin = (board, row, col, player) => {
    const directions = [
      [0, 1],  // 水平
      [1, 0],  // 垂直
      [1, 1],  // 对角线
      [1, -1]  // 反对角线
    ];

    for (let [dx, dy] of directions) {
      let count = 1; // 包含当前棋子

      // 向一个方向检查
      for (let i = 1; i < 5; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (
          newRow >= 0 && newRow < BOARD_SIZE &&
          newCol >= 0 && newCol < BOARD_SIZE &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      // 向相反方向检查
      for (let i = 1; i < 5; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (
          newRow >= 0 && newRow < BOARD_SIZE &&
          newCol >= 0 && newCol < BOARD_SIZE &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 5) {
        return true;
      }
    }
    return false;
  };

  // 处理AI下棋
  const handleAIMove = (row, col) => {
    // 更新棋盘状态
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = 'white'; // AI执白子
    setBoard(newBoard);

    // 检查AI是否获胜
    if (checkWin(newBoard, row, col, 'white')) {
      setWinner('ai');
      setGameOver(true);
      toast.error('AI获胜！游戏结束！');
      return;
    }

    // 检查是否平局
    const isBoardFull = newBoard.every(row => row.every(cell => cell !== null));
    if (isBoardFull) {
      setGameOver(true);
      toast.info('平局！游戏结束！');
      return;
    }

    // 切换到玩家回合
    setCurrentPlayer('player');
    // 重置玩家计时器
    setPlayerTimeLeft(30);
  };

  // 处理点击事件
  const handleCellClick = (row, col) => {
    // 如果游戏结束、不是玩家回合或该位置已被占用，则不处理
    if (gameOver || currentPlayer !== 'player' || board[row][col] !== null) {
      return;
    }

    // 更新棋盘状态
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = 'black'; // 玩家执黑子
    setBoard(newBoard);

    // 检查玩家是否获胜
    if (checkWin(newBoard, row, col, 'black')) {
      setWinner('player');
      setGameOver(true);
      toast.success('恭喜！您获胜了！');
      return;
    }

    // 检查是否平局
    const isBoardFull = newBoard.every(row => row.every(cell => cell !== null));
    if (isBoardFull) {
      setGameOver(true);
      toast.info('平局！游戏结束！');
      return;
    }

    // 切换到AI回合
    setCurrentPlayer('ai');
    // 重置AI计时器
    setAiTimeLeft(30);
  };

  // 重新开始游戏
  const handleRestart = () => {
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
    setCurrentPlayer('player');
    setGameOver(false);
    setWinner(null);
    setPlayerTimeLeft(30);
    setAiTimeLeft(30);
    toast.info('游戏已重新开始！');
  };

  // 处理难度变化
  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    // 重新开始游戏
    handleRestart();
    toast.info(`难度已设置为: ${level === 'easy' ? '简单' : level === 'medium' ? '中等' : '困难'}`);
  };

  return (
    <div className="board-container">
      <div className="game-info">
        <div className="difficulty-selector">
          <label>难度: </label>
          <button 
            className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
            onClick={() => handleDifficultyChange('easy')}
          >
            简单
          </button>
          <button 
            className={`difficulty-btn ${difficulty === 'medium' ? 'active' : ''}`}
            onClick={() => handleDifficultyChange('medium')}
          >
            中等
          </button>
          <button 
            className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`}
            onClick={() => handleDifficultyChange('hard')}
          >
            困难
          </button>
        </div>
        <div className="timer">
          <div className={`timer-item ${currentPlayer === 'player' ? 'active' : ''}`}>
            玩家时间: {playerTimeLeft}s
          </div>
          <div className={`timer-item ${currentPlayer === 'ai' ? 'active' : ''}`}>
            AI时间: {aiTimeLeft}s
          </div>
        </div>
        <div className="status">
          {currentPlayer === 'player' ? '玩家回合' : 'AI思考中...'}
        </div>
        <button onClick={handleRestart} className="restart-button">
          重新开始
        </button>
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell && <div className={`piece ${cell}`}></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;