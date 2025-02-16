import * as PIXI from "pixi.js";

class Tile {
	constructor(x, y, assets, config, onClick) {
		this.x = x;
		this.y = y;
		this.assets = assets;
		this.config = config;
		this.onClick = onClick;
		this.sprite = this.createSprite();
	}

	createSprite() {
		const sprite = new PIXI.AnimatedSprite(this.assets.spritesheets.stoneBreak.animations.break);
		sprite.position.set(this.x, this.y);
		sprite.eventMode = "static";
		sprite.on("pointerdown", () => this.handleClick());
		sprite.animationSpeed = 0.2;
		sprite.loop = false;
		return sprite;
	}

	handleClick() {
		if (this.onClick) {
			this.sprite.play();
			this.sprite.eventMode = "none";
			this.onClick(this);
		}
	}

	playBombAnimation() {
		const bombSprite = new PIXI.AnimatedSprite(this.assets.spritesheets.bomb.animations.bomb);
		bombSprite.position.set(this.x, this.y - 32);
		bombSprite.animationSpeed = 0.2;
		bombSprite.loop = false;
		bombSprite.play();
		this.sprite.parent.addChild(bombSprite);
		return bombSprite;
	}

	playCoinAnimation() {
		const coinSprite = new PIXI.AnimatedSprite(this.assets.spritesheets.coin.animations.coin);
		coinSprite.position.set(this.x, this.y);
		coinSprite.animationSpeed = 0.2;
		coinSprite.scale.set(2);
		coinSprite.loop = true;
		coinSprite.play();
		this.sprite.parent.addChild(coinSprite);
		return coinSprite;
	}
}
export default Tile;
