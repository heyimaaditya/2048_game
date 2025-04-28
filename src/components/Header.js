import React, { useEffect } from "react";

import { useLocalStorage } from "../utils/useLocalStorage";

function Header(props) {
	const { sideLength, score, startGame } = props;

	const [bestScore, setBestScore] = useLocalStorage(
        `bestScore_${sideLength}`,
        0
    );

	useEffect(() => {
		if (score > bestScore) {
            setBestScore(score);
        }
	}, [score, bestScore, setBestScore]);

	return (
		<header className="header" id="header">
			<div className="header-left">
				<div className="header-title">
					{sideLength === 4 ? 2048 : 4096}
				</div>
				<div className="header-subtitle">
					<div>
						Join the tiles, get to
						<span className="highlight-text">
							{" "}
							{sideLength === 4 ? 2048 : 4096}!{" "}
						</span>
					</div>
				</div>
			</div>
			<div className="header-right">
				<div className="score-board">
					<div className="score">
						<span className="score-head">SCORE</span>
						<span className="score-value">
                             {score}
                        </span>
					</div>
					<div className="score">
						<span className="score-head">BEST</span>
						<span className="score-value">
                             {bestScore}
                        </span>
					</div>
				</div>
				<div className="btn-container">
					<button
						className="action-btn"
						onClick={startGame}
					>
						New Game
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;