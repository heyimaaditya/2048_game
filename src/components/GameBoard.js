import React, { useState, useEffect, useRef } from "react";
import Tile from "./Tile";
import GameOver from "./GameOver";
import {
    initializeBoard,
    addRandomTileToBoard,
    moveHorizontal,
    moveRight, 
    moveVertical,
    checkForWin,
    checkForLoss,
    boardsEqual,
    WINNING_TILE 
} from "../utils/gameLogic"; 

function GameBoard(props) {
    const { sideLength, changeScore } = props;

    // Game state managed within GameBoard
    const [board, setBoard] = useState([]);
    const [gameStatus, setGameStatus] = useState('playing'); 
    const [scoreGainedThisMove, setScoreGainedThisMove] = useState(0); 

    // Create a ref for the game board div
    const gameBoardRef = useRef(null);

    // Function to initialize/reset the game
    const startGame = () => {
        const initialBoard = initializeBoard(sideLength);
        setBoard(initialBoard);
        changeScore(0); 
        setGameStatus('playing');
        setScoreGainedThisMove(0);
    };

    
    useEffect(() => {
        startGame();
    }, [sideLength]); 

    // Handle player input
    const handleMove = (direction) => {
        if (gameStatus !== 'playing') {
            return; 
        }

        const boardBeforeMove = boardsEqual(board, board); 
         let result;

        switch (direction) {
            case 'left':
                result = moveHorizontal(board);
                break;
            case 'right':
                result = moveRight(board); 
                break;
            case 'up':
                result = moveVertical(board, true);
                break;
            case 'down':
                result = moveVertical(board, false);
                break;
            default:
                return; 
        }

        const { newBoard, scoreGained } = result;

        // Check if the move actually changed the board
        const boardChanged = !boardsEqual(boardBeforeMove, newBoard);

        if (boardChanged) {
           
            setBoard(newBoard);
            setScoreGainedThisMove(scoreGained); 

           
             setTimeout(() => {
                const boardAfterNewTile = addRandomTileToBoard(newBoard);
                 setBoard(boardAfterNewTile);

               
                 if (checkForWin(boardAfterNewTile)) {
                     setGameStatus('win');
                 } else if (checkForLoss(boardAfterNewTile)) {
                     setGameStatus('lose');
                 }

             }, 100); 

        } else {
           
            setScoreGainedThisMove(0);
        }
    };

    // Effect to update parent score when scoreGainedThisMove changes
    useEffect(() => {
        if (scoreGainedThisMove > 0) {
             changeScore(scoreGainedThisMove);
        }
    }, [scoreGainedThisMove, changeScore]);

    // Handle Keydown Events
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                event.preventDefault();
            }

            switch (event.key) { 
                case 'ArrowLeft':
                    handleMove('left');
                    break;
                case 'ArrowUp':
                    handleMove('up');
                    break;
                case 'ArrowRight':
                    handleMove('right');
                    break;
                case 'ArrowDown':
                    handleMove('down');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [board, gameStatus]); 

    // Update grid styling based on board size using ref
    useEffect(() => {
        if (gameBoardRef.current) { 
            gameBoardRef.current.style.gridTemplateColumns = `repeat(${sideLength}, 1fr)`;
            gameBoardRef.current.style.gridTemplateRows = `repeat(${sideLength}, 1fr)`;
        }
    }, [sideLength]);

    return (
        <div className="game-board" ref={gameBoardRef}>
            {board.map((row, rowIndex) => {
                return row.map((tileValue, colIndex) => {
                    return (
                        <Tile
                            key={`${rowIndex}-${colIndex}`} 
                            value={tileValue}
                            sideLength={sideLength}
                            row={rowIndex}
                            col={colIndex}
                         />
                    );
                });
            })}

            {gameStatus !== 'playing' && ( 
                <GameOver gameStatus={gameStatus} startGame={startGame} />
            )}
        </div>
    );
}

export default GameBoard;