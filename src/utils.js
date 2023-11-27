export const countDown = (currentPlayer, setCurrentPlayer) => {
  const timer = setInterval(() => {
    if (currentPlayer.timeLeft > 0) {
      setCurrentPlayer((prevPlayer) => {
        return { ...prevPlayer, timeLeft: prevPlayer.timeLeft - 1 };
      });
    }
  }, 1000);
  return timer;
};
export const checkWinner = (board) => {
  // Check vertically
  for (let col = 0; col < 6; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        board[col][row] &&
        board[col][row] === board[col][row + 1] &&
        board[col][row] === board[col][row + 2] &&
        board[col][row] === board[col][row + 3]
      ) {
        return {
          color: board[col][row],
          indexes: [{ col: col, rows: [row, row + 1, row + 2, row + 3] }],
        };
      }
    }
  }
  // Check horizontally
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[col][row] &&
        board[col][row] === board[col + 1][row] &&
        board[col][row] === board[col + 2][row] &&
        board[col][row] === board[col + 3][row]
      ) {
        return {
          color: board[col][row],
          indexes: [{ row: row, cols: [col, col + 1, col + 2, col + 3] }],
        };
      }
    }
  }
};
export const moveMarker = (e, timeLeft, winner) => {
  if (timeLeft !== 0 && !winner) {
    let marker = document.getElementById('marker');

    let boardOffset;

    boardOffset = e.target.clientWidth * 0.078;
    if (
      e.nativeEvent.offsetX > boardOffset &&
      e.nativeEvent.offsetX < e.target.clientWidth - boardOffset
    ) {
      marker.style.left =
        e.nativeEvent.offsetX - marker.clientWidth / 2.2 + 'px';
    }
  }
};