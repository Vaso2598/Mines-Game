import Config from "./config";
import Assets from "./assets";
import Grid from "./grid";
import UI from "./ui";

import * as PIXI from "pixi.js";
class Game {
	constructor() {
		this.config = new Config();
		this.assets = new Assets();
		this.balance = this.config.initialBalance;
		this.bet = this.config.minBet;
		this.multipliedPrize = 0;
		this.winMultiplier = this.config.initialProbability;
		this.gameStarted = false;
	}

	async init() {
		await this.assets.init();
		this.app = new PIXI.Application();
		await this.app.init({
			width: 448,
			height: 448,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
		});
		this.app.stage.scale = 2;
		document.getElementById("game").appendChild(this.app.canvas);
		this.grid = new Grid(this, this.assets, this.config);
		this.ui = new UI(this);
		this.grid.create();
		this.setupGameBoard();
		this.ui.updateDisplay();
	}

	setupGameBoard() {
		const tileSize = this.config.tileSize;

		// Create wall sprites
		const wallTop = new PIXI.TilingSprite({
			texture: this.assets.textures.stoneMiddle,
			width: 224 - tileSize * 2,
			height: tileSize,
		});
		wallTop.position.set(tileSize, 0);

		const wallBottom = new PIXI.TilingSprite({
			texture: this.assets.textures.stoneMiddle,
			width: 224 - tileSize * 2,
			height: tileSize,
		});
		wallBottom.position.set(224 - tileSize, 224);
		wallBottom.angle = 180;
		wallBottom.pivot.set(0, 0);

		const wallLeft = new PIXI.TilingSprite({
			texture: this.assets.textures.stoneMiddle,
			width: 224 - tileSize * 2,
			height: tileSize,
		});
		wallLeft.position.set(tileSize, 224 - tileSize);
		wallLeft.angle = -90;
		wallLeft.pivot.set(0, wallLeft.height);

		const wallRight = new PIXI.TilingSprite({
			texture: this.assets.textures.stoneMiddle,
			width: 224 - tileSize * 2,
			height: tileSize,
		});
		wallRight.position.set(224, tileSize);
		wallRight.angle = 90;
		wallRight.pivot.set(0, 0);

		// Create corner sprites
		const topLeftCorner = new PIXI.Sprite(this.assets.textures.stoneCornerTL);
		topLeftCorner.position.set(0, 0);

		const topRightCorner = new PIXI.Sprite(this.assets.textures.stoneCornerTR);
		topRightCorner.position.set(224 - tileSize, 0);

		const bottomLeftCorner = new PIXI.Sprite(this.assets.textures.stoneCornerBL);
		bottomLeftCorner.position.set(0, 224 - tileSize);

		const bottomRightCorner = new PIXI.Sprite(this.assets.textures.stoneCornerBR);
		bottomRightCorner.position.set(224 - tileSize, 224 - tileSize);

		const backgroundSlabs = new PIXI.TilingSprite({
			texture: this.assets.textures.stoneSlab,
			width: 224 - tileSize * 2,
			height: 224 - tileSize * 2,
		});
		backgroundSlabs.position.set(tileSize, tileSize);

		this.app.stage.addChild(
			wallTop,
			wallBottom,
			wallRight,
			wallLeft,
			topLeftCorner,
			topRightCorner,
			bottomLeftCorner,
			bottomRightCorner,
			backgroundSlabs
		);
	}

	onBombHit() {
		this.gameStarted = false;
		this.ui.onGameOver();
	}

	startGame() {
		if (this.balance < this.bet) {
			this.assets.sounds.error.play();
			this.ui.elements.startButton.classList.add("is-error");
			this.ui.elements.startButton.classList.remove("is-success");
			this.ui.elements.startButton.innerText = "Not enough money!";
			return;
		}

		const oldContainer = this.app.stage.getChildByName("gridContainer");
		if (oldContainer) {
			this.app.stage.removeChild(oldContainer);
		}

		this.balance -= this.bet;
		this.gameStarted = true;
		this.winMultiplier = this.config.initialProbability;
		this.multipliedPrize = 0;

		const gridContainer = this.grid.create();
		gridContainer.label = "gridContainer";
		this.app.stage.addChild(gridContainer);

		this.ui.onGameStart();
		this.ui.updateDisplay();
	}

	reset() {
		this.gameStarted = false;
		this.multipliedPrize = 0;
		this.winMultiplier = this.config.initialProbability;

		const oldContainer = this.app.stage.getChildByName("gridContainer");
		if (oldContainer) {
			this.app.stage.removeChild(oldContainer);
		}

		const gridContainer = this.grid.create();
		gridContainer.label = "gridContainer";
		this.app.stage.addChild(gridContainer);

		this.ui.enableBetButtons();
		this.ui.updateDisplay();

		const startButton = document.getElementById("start");
		startButton.innerText = "Start Game";
		startButton.classList.remove("is-disabled", "is-error");
		startButton.classList.add("is-success");
	}

	cashout() {
		if (!this.gameStarted) return;

		this.balance += this.multipliedPrize;
		this.gameStarted = false;
		this.assets.sounds.cashout.play();
		this.reset();
	}
	onCoinCollected() {
		this.ui.onCoinCollected(this.multipliedPrize);
	}

	changeBet(amount) {
		const newBet = this.bet + amount;
		if (newBet >= this.config.minBet && newBet <= Math.min(this.balance, this.config.maxBet)) {
			this.bet = newBet;
			this.assets.sounds.button.play();
		}
	}
}

export default Game;
