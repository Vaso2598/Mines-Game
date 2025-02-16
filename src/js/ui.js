class UI {
	constructor(game) {
		this.game = game;
		this.elements = {
			betSub10: document.getElementById("-10"),
			betAdd10: document.getElementById("+10"),
			betAmount: document.getElementById("betAmount"),
			balance: document.getElementById("balance"),
			startButton: document.getElementById("start"),
		};
		this.setupEventListeners();
	}

	setupEventListeners() {
		this.elements.betSub10.addEventListener("click", () => this.handleBetChange(-10));
		this.elements.betAdd10.addEventListener("click", () => this.handleBetChange(10));
		this.elements.startButton.addEventListener("click", () => this.handleStartClick());
	}

	handleBetChange(amount) {
		this.game.changeBet(amount);
		this.updateDisplay();
	}

	handleStartClick() {
		if (this.game.gameStarted && this.game.multipliedPrize > 0) {
			this.game.cashout();
		} else if (!this.game.gameStarted) {
			this.game.startGame();
		}
	}

	updateDisplay() {
		this.elements.balance.innerText = `Total Money: ${this.game.balance}$`;
		this.elements.betAmount.innerText = `Bet: ${this.game.bet}$`;
	}

	onGameStart() {
		this.elements.startButton.innerText = "Cashout 0$";
		this.elements.startButton.classList.add("is-disabled");
		this.elements.startButton.classList.remove("is-success", "is-error");
		this.disableBetButtons();
	}

	onGameOver() {
		this.elements.startButton.innerText = "Start Game";
		this.elements.startButton.classList.remove("is-disabled", "is-success");
		this.elements.startButton.classList.add("is-error");
		this.elements.startButton.removeAttribute("disabled", "true");
		this.enableBetButtons();
	}

	onCoinCollected(prize) {
		this.elements.startButton.innerText = `Cashout ${prize}$`;
		this.elements.startButton.classList.remove("is-disabled");
		this.elements.startButton.classList.add("is-success");
	}

	disableBetButtons() {
		this.elements.betAdd10.classList.remove("is-primary");
		this.elements.betAdd10.classList.add("is-disabled");
		this.elements.betAdd10.setAttribute("disabled", "true");
		this.elements.betSub10.classList.remove("is-primary");
		this.elements.betSub10.classList.add("is-disabled");
		this.elements.betSub10.setAttribute("disabled", "true");
	}

	enableBetButtons() {
		this.elements.betAdd10.classList.remove("is-disabled");
		this.elements.betAdd10.classList.add("is-primary");
		this.elements.betAdd10.removeAttribute("disabled", "true");
		this.elements.betSub10.classList.remove("is-disabled");
		this.elements.betSub10.classList.add("is-primary");
		this.elements.betSub10.removeAttribute("disabled", "true");
	}
}
export default UI;
