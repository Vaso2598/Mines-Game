import * as PIXI from "pixi.js";
import Tile from "./tile";

class Grid {
	constructor(game, assets, config) {
		this.game = game;
		this.assets = assets;
		this.config = config;
		this.container = new PIXI.Container();
		this.tiles = [];
		this.bombPositions = new Set();
		this.clickedPositions = new Set();
		this.turn = 1;
	}

	create() {
		this.container.removeChildren();
		this.tiles = [];
		this.bombPositions.clear();
		this.clickedPositions.clear();
		this.turn = 1;

		for (let row = 0; row < this.config.gridSize; row++) {
			for (let col = 0; col < this.config.gridSize; col++) {
				const x = col * this.config.tileSize;
				const y = row * this.config.tileSize;
				const tile = new Tile(x, y, this.assets, this.config, (tile) => this.handleTileClick(tile));
				this.tiles.push(tile);
				this.container.addChild(tile.sprite);
			}
		}

		this.container.position.set(32, 32);
		return this.container;
	}
	handleTileClick(tile) {
		if (!this.game.gameStarted) return;

		const position = `${tile.x},${tile.y}`;
		if (this.clickedPositions.has(position)) return;

		this.clickedPositions.add(position);
		this.game.winMultiplier += this.config.growthRate;

		const isBomb = Math.random() < this.config.calculateBombProbability(this.turn);

		if (isBomb) {
			this.handleBombClick(tile, position);
		} else {
			this.handleCoinClick(tile);
		}

		this.turn++;
	}

	handleBombClick(tile, position) {
		this.bombPositions.add(position);
		this.assets.sounds.bomb.play();

		this.tiles.forEach((t) => (t.sprite.eventMode = "none"));

		const bombAnimation = tile.playBombAnimation();
		const additionalBombs = this.revealOtherBombs();

		this.game.onBombHit();

		Promise.all([
			new Promise((resolve) => (bombAnimation.onComplete = resolve)),
			...additionalBombs.map((bomb) => new Promise((resolve) => (bomb.onComplete = resolve))),
		]).then(() => {
			setTimeout(() => {
				this.game.reset();
			}, 500);
		});
	}

	handleCoinClick(tile) {
		this.assets.sounds.coin.play();
		const coinAnimation = tile.playCoinAnimation();

		this.game.multipliedPrize = Math.round(this.game.bet * (1 + this.game.winMultiplier));

		this.game.onCoinCollected();
	}

	revealOtherBombs() {
		const additionalBombs = [];
		const unclickedPositions = this.findUnclickedPositions();

		unclickedPositions.forEach((unclickedTile) => {
			if (Math.random() < this.config.calculateBombProbability(this.turn)) {
				this.bombPositions.add(`${unclickedTile.x},${unclickedTile.y}`);
				const bombAnim = unclickedTile.playBombAnimation();
				additionalBombs.push(bombAnim);
			}
		});

		return additionalBombs;
	}
	findUnclickedPositions() {
		return this.tiles.filter((tile) => !this.clickedPositions.has(`${tile.x},${tile.y}`));
	}
}

export default Grid;
