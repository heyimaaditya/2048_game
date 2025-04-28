import React from "react";

function GameOver(props) {
	const { gameStatus, startGame } = props;

    let message = '';
    let messageClass = 'message';

    if (gameStatus === 'win') {
        message = "You Win!";
        messageClass += ' win-message';
    } else if (gameStatus === 'lose') {
        message = "Game Over!";
    } else {
         
         return null;
    }

	return (
		<div className="game-status-overlay">
			<span className={messageClass}>{message}</span>
			<div className="btn-container">
				<button
					onClick={startGame}
					className="action-btn"
				>
					Try again
				</button>
			</div>
		</div>
	);
}

export default GameOver;