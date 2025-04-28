export const WINNING_TILE = 2048;
export const INITIAL_TILES = 2;
export const TILE_PROBABILITY = { 2: 0.9, 4: 0.1 };

// Function to initialize a new board
export function initializeBoard(size) {
    const newBoard = Array(size).fill(null).map(() => Array(size).fill(0));

    // Add initial tiles
    let boardWithTiles = addRandomTileToBoard(newBoard);
    boardWithTiles = addRandomTileToBoard(boardWithTiles); 

    return boardWithTiles;
}

// Add a random 2 or 4 tile to an empty cell
export function addRandomTileToBoard(board) {
    const size = board.length;
    const emptyCells = [];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (board[r][c] === 0) {
                emptyCells.push({ row: r, col: c });
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newValue = Math.random() < TILE_PROBABILITY[2] ? 2 : 4;
      
        const newBoard = cloneBoard(board);
        newBoard[randomCell.row][randomCell.col] = newValue;
        return newBoard;
    }

    return cloneBoard(board); 
}

// Slide and merge a single line 
function slideAndMergeLine(line) {
    const size = line.length;

    let filteredLine = line.filter(tile => tile !== 0);
    let scoreAdded = 0;
    let newLine = [];
    let mergedThisPass = false;

    
    for (let i = 0; i < filteredLine.length; i++) {
        if (mergedThisPass) {
            mergedThisPass = false;
            continue;
        }

        if (i + 1 < filteredLine.length && filteredLine[i] !== 0 && filteredLine[i] === filteredLine[i + 1]) {
            const mergedValue = filteredLine[i] * 2;
            newLine.push(mergedValue);
            scoreAdded += mergedValue;
            mergedThisPass = true;
        } else {
            newLine.push(filteredLine[i]);
        }
    }

    while (newLine.length < size) {
        newLine.push(0);
    }

    return { newLine, score: scoreAdded };
}

// Apply the slide and merge logic for horizontal moves
export function moveHorizontal(board) {
    let scoreGained = 0;
    const newBoard = [];

    for (let r = 0; r < board.length; r++) {
        let row = board[r];
        const result = slideAndMergeLine(row);
        newBoard.push(result.newLine);
        scoreGained += result.score;
    }

    return { newBoard, scoreGained };
}

// Apply the slide and merge logic for right moves
export function moveRight(board) {
    let scoreGained = 0;
    const newBoard = [];

    for (let r = 0; r < board.length; r++) {
        let row = board[r];
        const reversedRow = [...row].reverse(); 
        const result = slideAndMergeLine(reversedRow);
        const processedLine = [...result.newLine].reverse(); 

        newBoard.push(processedLine);
        scoreGained += result.score;
    }

    return { newBoard, scoreGained };
}


// Transpose a 2D array
function transpose(matrix) {
   
     if (!matrix || matrix.length === 0) {
         return matrix;
     }
    const size = matrix.length;
    if (matrix.length !== matrix[0].length) {
         console.warn("Transpose called on non-square matrix!");
         return matrix; 
    }

    const transposed = [];
    for (let i = 0; i < size; i++) {
        transposed[i] = [];
        for (let j = 0; j < size; j++) {
            transposed[i][j] = matrix[j][i];
        }
    }
    return transposed;
}

// Apply the slide and merge logic for vertical moves
export function moveVertical(board, isUp) {
     let scoreGained = 0;

  
    const transposedBoard = transpose(board);
    const newTransposedBoard = [];

    for (let c = 0; c < board.length; c++) { 
        let col = transposedBoard[c];
        let processedLine;
        let lineScore;

        if (isUp) {
            const result = slideAndMergeLine(col);
            processedLine = result.newLine;
            lineScore = result.score;
        } else {
            const reversedCol = [...col].reverse(); 
            const result = slideAndMergeLine(reversedCol);
            processedLine = [...result.newLine].reverse(); 
            lineScore = result.score;
        }

        newTransposedBoard.push(processedLine);
        scoreGained += lineScore;
    }


    const newBoard = transpose(newTransposedBoard);

    return { newBoard, scoreGained };
}


// Check if the board is full
function isBoardFull(board) {
    const size = board.length;
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (board[r][c] === 0) {
                return false; 
            }
        }
    }
    return true;
}

// Check if any merges are possible
function canMerge(board) {
    const size = board.length;

   
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size - 1; c++) {
            if (board[r][c] !== 0 && board[r][c] === board[r][c + 1]) {
                return true; 
            }
        }
    }

    // Check vertical merges 
    const transposedBoard = transpose(board);
     for (let r = 0; r < size; r++) { 
        for (let c = 0; c < size - 1; c++) {
            if (transposedBoard[r][c] !== 0 && transposedBoard[r][c] === transposedBoard[r][c + 1]) {
                return true;
            }
        }
    }

    return false; 
}


// Check for win condition
export function checkForWin(board) {
    const size = board.length;
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (board[r][c] === WINNING_TILE) {
                return true;
            }
        }
    }
    return false;
}

// Check for loss condition
export function checkForLoss(board) {
    return isBoardFull(board) && !canMerge(board);
}

// Deep clone a 2D array 
export function cloneBoard(board) {
    return board.map(row => [...row]);
}

// Compare two 2D arrays for equality
export function boardsEqual(board1, board2) {
    if (board1.length !== board2.length) return false;
    for (let i = 0; i < board1.length; i++) {
        if (board1[i].length !== board2[i].length) return false;
        for (let j = 0; j < board1[i].length; j++) {
            if (board1[i][j] !== board2[i][j]) return false;
           
        }
    }
    return true;
}

// Function to get colors for tiles 
export function getTileColor(value) {
    switch (value) {
        case 2: return { background: "#EEE4DA", color: "#776E65" };
        case 4: return { background: "#EEE1C9", color: "#776E65" };
        case 8: return { background: "#F2B27A", color: "#F9F6F2" };
        case 16: return { background: "#EC9464", color: "#F9F6F2" };
        case 32: return { background: "#E8795F", color: "#F9F6F2" };
        case 64: return { background: "#E55A3B", color: "#F9F6F2" };
        case 128: return { background: "#EDD073", color: "#F9F6F2" };
        case 256: return { background: "#EABB31", color: "#F9F6F2" };
        case 512: return { background: "#8DD9CC", color: "#F9F6F2" };
        case 1024: return { background: "#30BFBF", color: "#F9F6F2" };
        case 2048: return { background: "#0C99BA", color: "#F9F6F2" };
        case 4096: return { background: "#1164B5", color: "#FFFFFF" };
        default: return { background: "#CDC1B4", color: "#776E65" };
    }
}