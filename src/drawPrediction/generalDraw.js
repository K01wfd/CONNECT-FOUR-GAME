export const generalDraw = (board) => {
  let countersArr = [];
  let isGeneralDraw = false;
  board.forEach((col) => {
    col.forEach((row) => {
      countersArr.push(row);
    });
  });

  isGeneralDraw = countersArr.every((item) => item !== null);
  return isGeneralDraw;
};
