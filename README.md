# React 2048 Game

A web-based implementation of the popular 2048 puzzle game, built using React and plain JavaScript. This project follows the specific requirements and guidelines provided, focusing on core gameplay logic, a responsive UI, extensibility, and robustness.

## Features

*   **Classic 2048 Gameplay:** Implement the core mechanics of sliding and merging tiles.
*   **Arrow Key Controls:** Intuitive player interaction using keyboard arrow keys.
*   **Dynamic Board Display:** The game board updates visually after each valid move.
*   **Random Tile Generation:** New 2 or 4 tiles appear in empty cells after a successful move.
*   **Score Tracking:** Displays the current score, updated upon tile merges.
*   **Best Score:** Tracks and displays the highest score achieved, persisted in local storage.
*   **Win Condition:** Game ends with a "You Win!" message upon reaching the 2048 tile.
*   **Game Over Condition:** Game ends with a "Game Over!" message when no more moves are possible.
*   **New Game Functionality:** A button to easily restart the game at any time.
*   **Basic Responsive UI:** Layout adjusts to different screen sizes.

## Technologies Used

*   **React:** The JavaScript library for building the user interface.
*   **JavaScript:** The primary programming language for game logic and component behavior.
*   **HTML:** The structure of the web page.
*   **CSS:** Styling for the visual presentation and basic responsiveness.
*   **react-icons:** Used for icons (though the arrow icon wasn't strictly used in the final code, the dependency might be present from setup).
*   **uuid:** Used for generating unique IDs (though tile keys were simplified to index-based in the final code, the dependency might be present).

## Setup and Installation

1.  **Clone the repository** .
    ```bash
    # If you cloned:
    git clone <repository-url>
    cd my-2048-game-js
    ```
    ```bash
    # If creating manually :
    npx create-react-app my-2048-game-js
    cd my-2048-game-js
    npm install react-icons uuid # or yarn add react-icons uuid
    # Then manually create/copy the src folder structure and files.
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## How to Run

1.  Start the development server from the project directory:
    ```bash
    npm start
    # or
    yarn start
    ```
2.  The game will typically open in your browser at `http://localhost:3000`.

## How to Play

1.  Use the **Arrow Keys** on your keyboard to move the tiles (Up, Down, Left, Right).
2.  When two tiles with the same number touch while sliding, they **merge** into a single tile with the sum of their values.
3.  Your **Score** increases by the value of the new tile created during a merge.
4.  Aim to create a tile with the number **2048**.
5.  The game ends if you reach the 2048 tile (**You Win!**) or if the board is full and there are no possible moves left (**Game Over!**).
6.  Click the **"New Game"** button to start over.

## Code Structure

The project is organized into a standard React application structure:

*   `public/`: Public assets (like `index.html`).
*   `src/`: Contains the core application code.
    *   `components/`: Reusable React components:
        *   `Footer.js`: Displays game instructions.
        *   `GameBoard.js`: Manages the game board state, handles input, and renders tiles.
        *   `GameOver.js`: Displays the game over or win message overlay.
        *   `Header.js`: Displays scores and the new game button.
        *   `Tile.js`: Represents a single tile on the board.
    *   `utils/`: Utility functions and custom hooks:
        *   `gameLogic.js`: Contains the core game logic (board initialization, moves, merging, win/loss checks, random tile generation).
        *   `useLocalStorage.js`: A custom React hook for interacting with browser local storage (used for the best score).
    *   `App.js`: The main application component, holds top-level state like score and board size.
    *   `App.css`: Styling specific to the main `App` component layout and game elements.
    *   `index.js`: The entry point for the React application.
    *   `index.css`: Basic global styles for the body and root elements.

## Development Guidelines Implementation

*   **User-Friendly and Responsive UI:** Basic responsiveness is included via CSS. The UI is laid out clearly with scores, board, and game status messages.
*   **Extensibility:**
    *   Core game logic is separated into pure functions in `gameLogic.js`, making it easier to understand and modify specific game rules (e.g., tile generation probabilities, winning tile value).
    *   The `sideLength` state is handled appropriately to dynamically size the board grid, allowing for different grid sizes with minimal code changes (primarily updating `sideLength` and ensuring CSS scales correctly).
    *   Components are modular and handle their specific parts of the UI.
*   **Robustness:**
    *   **Moves Without Shifts:** The `handleMove` function in `GameBoard.js` checks if the board state changes after a move before adding a new tile, preventing the board from filling up unnecessarily if a move doesn't result in any tile movement or merge.
    *   **Detecting Game Over:** The `checkForLoss` utility accurately determines the game over condition by checking if the board is full *and* if any merges are possible.
    *   **Detecting Win:** The `checkForWin` utility accurately detects if the 2048 tile has been created.
    *   **Correct Logic:** The implementation of `slideAndMergeLine` follows the standard 2048 merging rules more accurately.
    *   **Safe Tile Addition:** `addRandomTileToBoard` checks for empty cells before attempting to place a tile.

