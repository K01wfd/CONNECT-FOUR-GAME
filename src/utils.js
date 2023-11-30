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
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 4; row++) {
      if (
        board[col][row] &&
        board[col][row] === board[col][row + 1] &&
        board[col][row] === board[col][row + 2] &&
        board[col][row] === board[col][row + 3]
      ) {
        return {
          color: board[col][row],
          indexes: [
            { col: col, row: row },
            { col: col, row: row + 1 },
            { col: col, row: row + 2 },
            { col: col, row: row + 3 },
          ],
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
          indexes: [
            { col: col, row: row },
            { col: col + 1, row: row },
            { col: col + 2, row: row },
            { col: col + 3, row: row },
          ],
        };
      }
    }
  }
  // check digonaly top-left to bottom-right
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        board[col][row] &&
        board[col][row] === board[col + 1][row + 1] &&
        board[col][row] === board[col + 2][row + 2] &&
        board[col][row] === board[col + 3][row + 3]
      ) {
        return {
          color: board[col][row],
          indexes: [
            { col: col, row: row },
            { col: col + 1, row: row + 1 },
            { col: col + 2, row: row + 2 },
            { col: col + 3, row: row + 3 },
          ],
        };
      }
    }
  }
  // check digonaly top-right to bottom-left
  for (let col = 6; col >= 3; col--) {
    for (let row = 0; row < 3; row++) {
      if (
        board[col][row] &&
        board[col][row] === board[col - 1][row + 1] &&
        board[col][row] === board[col - 2][row + 2] &&
        board[col][row] === board[col - 3][row + 3]
      ) {
        return {
          color: board[col][row],
          indexes: [
            { col: col, row: row },
            { col: col - 1, row: row + 1 },
            { col: col - 2, row: row + 2 },
            { col: col - 3, row: row + 3 },
          ],
        };
      }
    }
  }
};

export const setTimeOutWinnerScore = (currentPlayer, setScore) => {
  if (currentPlayer.timeLeft === 0 && currentPlayer.activePlayer === 'red') {
    setScore((prevScore) => {
      return {
        ...prevScore,
        player2Score: prevScore.player2Score + 1,
      };
    });
  }
  if (currentPlayer.timeLeft === 0 && currentPlayer.activePlayer === 'yellow') {
    setScore((prevScore) => {
      return {
        ...prevScore,
        player1Score: prevScore.player1Score + 1,
      };
    });
  }
};
export const setFooterBg = (patternWinner, currentPlayer) => {
  let footerBg = '';
  if (patternWinner) {
    footerBg = patternWinner.color === 'red' ? 'bg-red' : 'bg-yellow';
  }
  footerBg =
    currentPlayer.activePlayer === 'red' && currentPlayer.timeLeft === 0
      ? 'bg-yellow'
      : currentPlayer.activePlayer === 'yellow' && currentPlayer.timeLeft === 0
      ? 'bg-red'
      : footerBg;
  return footerBg;
};
// export const predictDraw = (board) => {
//   let columnDrawChance = 0;
//   for (let col = 0; col < 7; col++) {
//     for (let row = 5; row >= 3; row - 2) {
//       if (board[col][row - 1] && board[col][row] !== board[col][row]) {
//         columnDrawChance++;
//       }
//     }
//   }

//   console.log(columnDrawChance);
// };
