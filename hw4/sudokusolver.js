const sudokuBoard = [
    [7, 0, 4, 8, 0, 0, 3, 0, 1],
    [8, 2, 0, 5, 0, 0, 0, 4, 0],
    [0, 0, 9, 4, 3, 0, 5, 0, 0],
    [3, 1, 0, 0, 0, 0, 8, 0, 7],
    [0, 8, 0, 0, 0, 0, 0, 1, 0],
    [9, 0, 7, 0, 0, 0, 0, 3, 2],
    [0, 0, 6, 0, 1, 5, 4, 0, 0],
    [0, 7, 0, 0, 0, 9, 0, 6, 5],
    [5, 0, 8, 0, 0, 2, 1, 0, 3],
];
const isValid = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {

        if (
            board[row][x] === num ||
            board[x][col] === num ||
            board[3 * Math.floor(row / 3) + Math.floor(x / 3)][
                3 * Math.floor(col / 3) + (x % 3)
            ] === num
        ) {
            return false;
        }
    }
    return true;
};

const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
};
if (solveSudoku(sudokuBoard)) {
    console.log("Sudoku solved!");
    console.log(sudokuBoard);
} else {
    console.log("No solution exists.");
}
