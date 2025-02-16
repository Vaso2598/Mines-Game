# Mines Game

## Overview

This is a simple Mines game built using JavaScript, PIXI.js for rendering, and Howler.js for sound effects. The game involves clicking tiles to reveal coins or bombs. The objective is to collect as many coins as possible without hitting a bomb.

## Features

- **Dynamic Grid**: The game grid is dynamically generated based on the configuration.
- **Betting System**: Players can adjust their bet amount before starting the game.
- **Animations**: Smooth animations for coin collection and bomb explosions.
- **Sound Effects**: Engaging sound effects for various game actions.

## Installation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mines-game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mines-game
   ```
3. Install the dependencies using npm:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open link from terminal in your browser to start the game.

## Usage

- **Start Game**: Click the "Start Game" button to begin.
- **Adjust Bet**: Use the "-10$" and "+10$" buttons to adjust your bet amount.
- **Cashout**: Click the "Cashout" button to collect your winnings before hitting a bomb.

## Configuration

The game configuration can be adjusted in `src/js/config.js`:

- `initialProbability`: Initial probability of hitting a bomb.
- `maxProbability`: Maximum probability of hitting a bomb.
- `growthRate`: Rate at which the bomb probability increases.
- `tileSize`: Size of each tile in the grid.
- `gridSize`: Number of tiles in each row and column of the grid.
- `initialBalance`: Starting balance for the player.
- `minBet`: Minimum bet amount.
- `maxBet`: Maximum bet amount.

## Dependencies

- [PIXI.js](https://pixijs.com/)
- [Howler.js](https://howlerjs.com/)
- [NES.css](https://nostalgic-css.github.io/NES.css/)

## Acknowledgements

- Uses assets and sounds from various free resources.

Enjoy the game!
