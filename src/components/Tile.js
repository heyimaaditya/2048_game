import React from "react";
import { getTileColor } from "../utils/gameLogic"; 

function Tile(props) {
	const { value, sideLength, row, col } = props;

    const colors = getTileColor(value);
   

    let fontSize = '54px';
    if (value >= 128 && value < 1024) {
        fontSize = '48px';
    } else if (value >= 1024) {
        fontSize = '40px';
    }

	return (
		<div
			className="tile" 
			style={{
                backgroundColor: colors.background,
                color: colors.color,
                 fontSize: value > 0 ? fontSize : '0px' 
            }}
            
		>
			<span className="tile-value">
				{value > 0 ? value : ""}
			</span>
		</div>
	);
}

export default Tile;