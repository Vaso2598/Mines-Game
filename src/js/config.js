class Config {
    constructor() {
        this.initialProbability = 0.01;
        this.maxProbability = 0.8;
        this.growthRate = 0.15;
        this.tileSize = 32;
        this.gridSize = 5;
        this.initialBalance = 1000;
        this.minBet = 10;
        this.maxBet = 100;
    }

    calculateBombProbability(turn) {
        turn = Math.max(1, turn);
        const x = (turn - 1) * this.growthRate;
        const sigmoid = 1 / (1 + Math.exp(-x));
        const probabilityRange = this.maxProbability - this.initialProbability;
        return this.initialProbability + sigmoid * probabilityRange;
    }
}

export default Config;