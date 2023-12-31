import { drawPaterns } from '../data';
export const predictVerticalDraw = (board) => {
  let { redColumnPatterns, yellowColumnPatterns } = drawPaterns;
  let columnWithDrawFound = [];
  let uniqueDraw = [];
  // search for possible vertical draw
  for (let column = 0; column < 7; column++) {
    // starting from col 0 row 5, three function to compare starting from base position
    // which is 5 then access other positions by subtracting
    redColumnPatterns.forEach((pattern, index) => {
      firstPositionCheck(board, pattern, column, 5, index) ||
      secondPositionCheck(board, pattern, column, 5, index) ||
      thirdPositionCheck(board, pattern, column, 5, index)
        ? columnWithDrawFound.push(column)
        : null;
    });
    yellowColumnPatterns.forEach((pattern, index) => {
      firstPositionCheck(board, pattern, column, 5, index) ||
      secondPositionCheck(board, pattern, column, 5, index) ||
      thirdPositionCheck(board, pattern, column, 5, index)
        ? columnWithDrawFound.push(column)
        : null;
    });
  }
  if (columnWithDrawFound) {
    uniqueDraw = columnWithDrawFound.reduce((acc, value) => {
      if (!acc.includes(value)) {
        acc.push(value);
      }
      return acc;
    }, []);
  }
  if (uniqueDraw.length === 7) {
    return true;
  } else {
    return false;
  }
};

// if the drawPatterns array start vertically by using column patterns
// starting from last row in the board and going up.
let firstPositionCheck = (board, pattern, col, basePosition, index) => {
  if (
    index < 4 &&
    board[col][basePosition] === pattern[basePosition] &&
    board[col][basePosition - 1] === pattern[basePosition - 1] &&
    board[col][basePosition - 2] === pattern[basePosition - 2] &&
    board[col][basePosition - 3] === pattern[basePosition - 3]
  ) {
    return true;
  } else {
    return false;
  }
};
let secondPositionCheck = (board, pattern, col, basePosition, index) => {
  if (
    index > 3 &&
    index < 8 &&
    board[col][basePosition - 1] === pattern[basePosition - 1] &&
    board[col][basePosition - 2] === pattern[basePosition - 2] &&
    board[col][basePosition - 3] === pattern[basePosition - 3] &&
    board[col][basePosition - 4] === pattern[basePosition - 4]
  ) {
    return true;
  } else {
    return false;
  }
};
let thirdPositionCheck = (board, pattern, col, basePosition, index) => {
  if (
    index > 7 &&
    board[col][basePosition - 2] === pattern[basePosition - 2] &&
    board[col][basePosition - 3] === pattern[basePosition - 3] &&
    board[col][basePosition - 4] === pattern[basePosition - 4] &&
    board[col][basePosition - 5] === pattern[basePosition - 5]
  ) {
    return true;
  } else {
    return false;
  }
};
