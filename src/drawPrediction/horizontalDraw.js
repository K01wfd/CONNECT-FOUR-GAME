import { drawPaterns } from '../data';
export const predictHorizontalDraw = (board) => {
  // the draw patterns are for column search and row search
  let { redRowPatterns, yellowRowPatterns } = drawPaterns;
  let rowWithDrawFound = [];
  let uniqueDraw = [];
  let drawResult = false;
  // search for possible vertical draw
  for (let row = 0; row < 7; row++) {
    // starting from col 0 row 5, three function to compare starting from base position
    // which is 5 then access other positions by subtracting
    // look at drawPatterns to see how each col or row is compared to a pattern
    redRowPatterns.forEach((pattern, index) => {
      firstPositionCheck(board, pattern, row, 0, index) ||
      secondPositionCheck(board, pattern, row, 0, index) ||
      thirdPositionCheck(board, pattern, row, 0, index)
        ? rowWithDrawFound.push(row)
        : null;
    });
    yellowRowPatterns.forEach((pattern, index) => {
      firstPositionCheck(board, pattern, row, 0, index) ||
      secondPositionCheck(board, pattern, row, 0, index) ||
      thirdPositionCheck(board, pattern, row, 0, index)
        ? rowWithDrawFound.push(row)
        : null;
    });
  }
  if (rowWithDrawFound) {
    uniqueDraw = rowWithDrawFound.reduce((acc, value) => {
      if (!acc.includes(value)) {
        acc.push(value);
      }
      return acc;
    }, []);
  }
  if (uniqueDraw.length === 6) {
    return true;
  } else {
    return false;
  }
};
let firstPositionCheck = (board, pattern, row, basePosition, index) => {
  if (
    index < 4 &&
    board[basePosition][row] === pattern[basePosition] &&
    board[basePosition + 1][row] === pattern[basePosition + 1] &&
    board[basePosition + 2][row] === pattern[basePosition + 2] &&
    board[basePosition + 3][row] === pattern[basePosition + 3] &&
    board[basePosition + 4][row] === pattern[basePosition + 4]
  ) {
    return true;
  } else {
    return false;
  }
};
let secondPositionCheck = (board, pattern, row, basePosition, index) => {
  if (
    index > 3 &&
    index < 8 &&
    board[basePosition + 1][row] === pattern[basePosition + 1] &&
    board[basePosition + 2][row] === pattern[basePosition + 2] &&
    board[basePosition + 3][row] === pattern[basePosition + 3] &&
    board[basePosition + 4][row] === pattern[basePosition + 4] &&
    board[basePosition + 5][row] === pattern[basePosition + 5]
  ) {
    return true;
  } else {
    return false;
  }
};
let thirdPositionCheck = (board, pattern, row, basePosition, index) => {
  if (
    index > 7 &&
    board[basePosition + 2][row] === pattern[basePosition + 2] &&
    board[basePosition + 3][row] === pattern[basePosition + 3] &&
    board[basePosition + 4][row] === pattern[basePosition + 4] &&
    board[basePosition + 5][row] === pattern[basePosition + 5] &&
    board[basePosition + 6][row] === pattern[basePosition + 6]
  ) {
    return true;
  } else {
    return false;
  }
};
