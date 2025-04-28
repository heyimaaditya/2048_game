import React from "react";

function Footer(props) {
	const { sideLength } = props;
	return (
		<footer className="footer" id="footer">
			<div className="footer-info">
				<span className="highlight-text"> HOW TO PLAY: </span>
				Use your <span className="highlight-text"> arrow keys</span> to move the
				tiles. Tiles with the same number
				<span className="highlight-text"> merge into one </span> when they
				touch. Add them up to reach
				<span className="highlight_text">
					{" "}
					{sideLength === 4 ? 2048 : 4096}!
				</span>
			</div>
		</footer>
	);
}

export default Footer;