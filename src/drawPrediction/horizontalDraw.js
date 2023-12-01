import { drawPaterns } from '../data';
export const predictVerticalDraw = (board) => {
  let { redPatterns, yellowPatterns } = drawPaterns;
  let columnWithDrawFound = [];
  let uniqueDraw = [];
  let drawResult = false;
  // search for possible vertical draw
  for (let column = 0; column < 7; column++) {
    // starting from col 0 row 5, three function to compare starting from base position
    // which is 5 then access other positions by subtracting
    redPatterns.forEach((pattern, index) => {
      firstPositionCheck(board, pattern, column, 5, index) ||
      secondPositionCheck(board, pattern, column, 5, index) ||
      thirdPositionCheck(board, pattern, column, 5, index)
        ? columnWithDrawFound.push(column)
        : null;
    });
    yellowPatterns.forEach((pattern, index) => {
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
  drawResult = uniqueDraw.reduce((acc, value) => acc + value, 0);
  if (drawResult > 20) {
    return true;
  } else {
    return false;
  }
};
