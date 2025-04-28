import React, { useState } from "react";
import "./App.css"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import GameBoard from "./components/GameBoard";


function App() {
	const [sideLength, setSideLength] = useState(4); 
	const [score, setScore] = useState(0);
    const [gameStatus, setGameStatus] = useState('playing');

    // Function to update score 
	const changeScore = (value) => {
		setScore((prevScore) => prevScore + value);
	};

    // Function to reset score to 0
    const resetScore = () => {
        setScore(0);
    };

    // Function to handle move results from GameBoard
    const handleMoveResult = (scoreGained, newBoard, status) => {
        if (scoreGained > 0) {
            setScore(prevScore => prevScore + scoreGained);
        }
       
        setGameStatus(status);
    }

    // Pass a combined startGame function down
    const startGame = () => {
        resetScore();
        setGameStatus('playing');
     
    };

	return (
		<div className="App">
            {/* VisitCount removed for simplicity */}
			<div className="game-container">
				<Header
					sideLength={sideLength}
					score={score}
					startGame={startGame} 
				/>
				<GameBoard
					sideLength={sideLength}
					changeScore={setScore} 
				/>
				<Footer sideLength={sideLength} />
			</div>
		</div>
	);
}

export default App;
