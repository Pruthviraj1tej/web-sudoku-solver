const grid = document.getElementById("grid");

// Create 9x9 Sudoku grid
for (let i = 0; i < 81; i++) {
  const input = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.max = "9";
  input.id = "cell-" + i;
  grid.appendChild(input);
}

function getBoard() {
  let board = [];
  for (let i = 0; i < 9; i++) {
    board[i] = [];
    for (let j = 0; j < 9; j++) {
      const val = document.getElementById("cell-" + (i * 9 + j)).value;
      board[i][j] = val === "" ? 0 : parseInt(val);
    }
  }
  return board;
}

function setBoard(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById("cell-" + (i * 9 + j)).value = board[i][j] === 0 ? "" : board[i][j];
    }
  }
}

function clearBoard() {
  for (let i = 0; i < 81; i++) {
    const cell = document.getElementById("cell-" + i);
    cell.value = "";
    cell.classList.remove("prefilled");
  }
}

function solve() {
  const board = getBoard();
  if (solveSudoku(board)) {
    setBoard(board);
  } else {
    alert("No solution exists!");
  }
}

function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }

  const startRow = row - row % 3;
  const startCol = col - col % 3;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board[startRow + i][startCol + j] === num) return false;

  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}