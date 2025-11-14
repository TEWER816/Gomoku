// 使用Map进行记忆化缓存
const evaluationCache = new Map();
const CACHE_MAX_SIZE = 10000;

// 优化的AI实现（支持难度选择和Alpha-Beta剪枝）
export const makeSmartAIMove = (board, difficulty = 'medium') => {
  const BOARD_SIZE = 15;
  
  // 生成棋盘的唯一键值用于缓存
  const getBoardKey = (board) => {
    let key = '';
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === null) {
          key += '0';
        } else if (board[row][col] === 'black') {
          key += '1';
        } else {
          key += '2';
        }
      }
    }
    return key;
  };
  
  // 优化：只考虑关键区域内的空位（围绕已有棋子的区域）
  const getRelevantEmptyCells = () => {
    const emptyCells = [];
    const hasAdjacentPiece = (r, c) => {
      for (let dr = -4; dr <= 4; dr++) {
        for (let dc = -4; dc <= 4; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] !== null) {
            return true;
          }
        }
      }
      return false;
    };

    // 如果棋盘为空，返回中心位置
    let hasPieces = false;
    for (let r = 0; r < BOARD_SIZE && !hasPieces; r++) {
      for (let c = 0; c < BOARD_SIZE && !hasPieces; c++) {
        if (board[r][c] !== null) {
          hasPieces = true;
        }
      }
    }

    if (!hasPieces) {
      return [{ row: Math.floor(BOARD_SIZE / 2), col: Math.floor(BOARD_SIZE / 2) }];
    }

    // 只考虑有相邻棋子的空位及其周围的空位
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === null && hasAdjacentPiece(row, col)) {
          emptyCells.push({ row, col });
        }
      }
    }
    
    // 如果没有相关空位，扩展搜索范围
    if (emptyCells.length === 0) {
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          if (board[row][col] === null) {
            emptyCells.push({ row, col });
          }
        }
      }
    }
    
    return emptyCells;
  };
  
  // 获取相关空位
  const emptyCells = getRelevantEmptyCells();
  
  // 如果没有空位，返回null
  if (emptyCells.length === 0) {
    return null;
  }
  
  // 根据难度调整AI行为
  let maxDepth = 1; // 搜索深度
  let randomness = 0; // 随机性因子
  let winPriority = true; // 优先获胜策略
  
  switch (difficulty) {
    case 'easy':
      maxDepth = 1;
      randomness = 0.3; // 30%的概率随机选择
      winPriority = false; // 简单难度不优先考虑获胜
      break;
    case 'medium':
      maxDepth = 2;
      randomness = 0.1; // 10%的概率随机选择
      break;
    case 'hard':
      maxDepth = 3; // 降低困难模式的搜索深度，避免卡顿
      randomness = 0; // 不随机选择
      break;
    default:
      maxDepth = 2;
      randomness = 0.1;
  }
  
  // 检查是否获胜
  const checkWin = (board, row, col, player) => {
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    
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
  
  // 优化的启发式评估函数
  const evaluatePosition = (board, row, col, player) => {
    // 如果是获胜位置，直接返回最高分
    if (winPriority && checkWin(board, row, col, player)) {
      return player === 'white' ? 100000 : -100000;
    }
    
    let score = 0;
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    
    for (let [dx, dy] of directions) {
      let count = 1; // 包含当前棋子
      let blocked = 0;
      
      // 向一个方向检查
      for (let i = 1; i < 5; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (
          newRow >= 0 && newRow < BOARD_SIZE &&
          newCol >= 0 && newCol < BOARD_SIZE
        ) {
          if (board[newRow][newCol] === player) {
            count++;
          } else if (board[newRow][newCol] !== null) {
            blocked++;
            break;
          } else {
            break;
          }
        } else {
          blocked++;
          break;
        }
      }
      
      // 向相反方向检查
      for (let i = 1; i < 5; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (
          newRow >= 0 && newRow < BOARD_SIZE &&
          newCol >= 0 && newCol < BOARD_SIZE
        ) {
          if (board[newRow][newCol] === player) {
            count++;
          } else if (board[newRow][newCol] !== null) {
            blocked++;
            break;
          } else {
            break;
          }
        } else {
          blocked++;
          break;
        }
      }
      
      // 根据连子数和阻挡情况评分
      if (count >= 5) {
        score += player === 'white' ? 100000 : -100000;
      } else if (count === 4) {
        if (blocked === 0) {
          score += player === 'white' ? 10000 : -10000;  // 活四
        } else if (blocked === 1) {
          score += player === 'white' ? 1000 : -1000;   // 冲四
        }
      } else if (count === 3) {
        if (blocked === 0) {
          score += player === 'white' ? 1000 : -1000;   // 活三
        } else if (blocked === 1) {
          score += player === 'white' ? 100 : -100;    // 眠三
        }
      } else if (count === 2) {
        if (blocked === 0) {
          score += player === 'white' ? 100 : -100;    // 活二
        } else if (blocked === 1) {
          score += player === 'white' ? 10 : -10;     // 眠二
        }
      } else if (count === 1) {
        score += player === 'white' ? 1 : -1;        // 单子
      }
    }
    
    return score;
  };
  
  // 评估整个棋盘（带缓存）
  const evaluateBoard = (board) => {
    const boardKey = getBoardKey(board);
    
    // 检查缓存
    if (evaluationCache.has(boardKey)) {
      return evaluationCache.get(boardKey);
    }
    
    let totalScore = 0;
    
    // 只评估相关区域内的位置
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] !== null) {
          // 评估该位置的棋子
          totalScore += evaluatePosition(board, row, col, board[row][col]);
        }
      }
    }
    
    // 缓存结果
    if (evaluationCache.size >= CACHE_MAX_SIZE) {
      // 如果缓存已满，删除第一个元素
      const firstKey = evaluationCache.keys().next().value;
      evaluationCache.delete(firstKey);
    }
    evaluationCache.set(boardKey, totalScore);
    
    return totalScore;
  };
  
  // Alpha-Beta剪枝算法（带缓存和时间限制）
  const alphaBeta = (board, depth, alpha, beta, isMaximizing, startTime, timeLimit) => {
    // 检查是否超时
    if (Date.now() - startTime > timeLimit) {
      return evaluateBoard(board);
    }
    
    // 检查是否达到最大深度
    if (depth === 0) {
      return evaluateBoard(board);
    }
    
    // 获取相关空位
    const relevantCells = getRelevantEmptyCells();
    
    // 如果是最大化玩家（AI）
    if (isMaximizing) {
      let maxEval = -Infinity;
      
      for (let { row, col } of relevantCells) {
        // 检查是否超时
        if (Date.now() - startTime > timeLimit) {
          break;
        }
        
        // 在这个位置放置AI棋子
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = 'white';
        
        // 检查是否获胜
        if (checkWin(newBoard, row, col, 'white')) {
          return 100000;
        }
        
        const evaluation = alphaBeta(newBoard, depth - 1, alpha, beta, false, startTime, timeLimit);
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        
        // Alpha-Beta剪枝
        if (beta <= alpha) {
          break;
        }
      }
      
      return maxEval;
    } else {
      // 最小化玩家（对手）
      let minEval = Infinity;
      
      for (let { row, col } of relevantCells) {
        // 检查是否超时
        if (Date.now() - startTime > timeLimit) {
          break;
        }
        
        // 在这个位置放置玩家棋子
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = 'black';
        
        // 检查是否获胜
        if (checkWin(newBoard, row, col, 'black')) {
          return -100000;
        }
        
        const evaluation = alphaBeta(newBoard, depth - 1, alpha, beta, true, startTime, timeLimit);
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        
        // Alpha-Beta剪枝
        if (beta <= alpha) {
          break;
        }
      }
      
      return minEval;
    }
  };
  
  // 优化：如果随机选择，从相关空位中随机选择
  if (Math.random() < randomness) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }
  
  // 对于简单难度，不使用Alpha-Beta剪枝
  if (difficulty === 'easy') {
    let bestScore = -Infinity;
    let bestMoves = [];
    
    for (let { row, col } of emptyCells) {
      // 评估AI在这个位置落子的得分
      const aiScore = evaluatePosition(board, row, col, 'white');
      if (aiScore === 100000) { // AI可获胜
        return { row, col };
      }
      
      // 评估玩家在这个位置落子的得分（防守）
      const playerScore = evaluatePosition(board, row, col, 'black');
      if (playerScore === -100000 && difficulty !== 'easy') { // 阻止玩家获胜
        return { row, col };
      }
      
      // 总分为进攻得分和防守得分的加权
      let attackWeight = 0.7;
      let defenseWeight = 0.5;
      
      const totalScore = aiScore * attackWeight + playerScore * defenseWeight;
      
      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestMoves = [{ row, col }];
      } else if (Math.abs(totalScore - bestScore) < 0.1) {
        bestMoves.push({ row, col });
      }
    }
    
    // 如果有多个最佳位置，随机选择一个
    const randomIndex = Math.floor(Math.random() * bestMoves.length);
    return bestMoves[randomIndex];
  }
  
  // 使用Alpha-Beta剪枝算法选择最佳移动
  let bestScore = -Infinity;
  let bestMove = null;
  
  // 设置时间限制（毫秒）
  const timeLimit = difficulty === 'hard' ? 1500 : 1000; // 困难模式最多1.5秒，其他模式1秒
  const startTime = Date.now();
  
  for (let { row, col } of emptyCells) {
    // 检查是否超时
    if (Date.now() - startTime > timeLimit) {
      // 如果超时但还没有找到移动，使用第一个找到的移动
      if (bestMove === null && emptyCells.length > 0) {
        bestMove = emptyCells[0];
      }
      break;
    }
    
    // 在这个位置放置AI棋子
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = 'white';
    
    // 检查是否获胜
    if (checkWin(newBoard, row, col, 'white')) {
      return { row, col };
    }
    
    // 检查阻止玩家获胜
    const playerBoard = board.map(r => [...r]);
    playerBoard[row][col] = 'black';
    if (checkWin(playerBoard, row, col, 'black') && difficulty !== 'easy') {
      return { row, col };
    }
    
    // 使用Alpha-Beta剪枝评估这个移动（带时间限制）
    const score = alphaBeta(newBoard, maxDepth - 1, -Infinity, Infinity, false, startTime, timeLimit);
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = { row, col };
    }
  }
  
  // 如果没有找到最佳移动（可能因为超时），从相关空位中选择一个
  if (bestMove === null && emptyCells.length > 0) {
    bestMove = emptyCells[0];
  }
  
  return bestMove;
};