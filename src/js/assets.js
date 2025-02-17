import * as PIXI from "pixi.js";
import {Howl} from "howler";
class Assets {
	constructor() {
		this.textures = {};
		this.sounds = {};
		this.spritesheets = {};
	}

	async init() {
		await this.loadTextures();
		this.loadSounds();
		await this.createSpritesheets();
	}

	async loadTextures() {
		this.textures = {
			stoneMiddle: await PIXI.Assets.load("./sprites/StoneMiddle.png"),
			stoneCornerTR: await PIXI.Assets.load("./sprites/StoneCornerTR.png"),
			stoneCornerTL: await PIXI.Assets.load("./sprites/StoneCornerTL.png"),
			stoneCornerBR: await PIXI.Assets.load("./sprites/StoneCornerBR.png"),
			stoneCornerBL: await PIXI.Assets.load("./sprites/StoneCornerBL.png"),
			stoneSlab: await PIXI.Assets.load("./sprites/StoneSlab.png"),
			stoneRubble: await PIXI.Assets.load("./sprites/StoneBreak.png"),
			bomb: await PIXI.Assets.load("./sprites/Bomb.png"),
			coin: await PIXI.Assets.load("./sprites/Coin.png"),
		};
	}

	loadSounds() {
		this.sounds = {
			coin: new Howl({src: "./sounds/sfx_coin_double1.wav", volume: 0.2}),
			bomb: new Howl({src: "./sounds/sfx_exp_medium1.wav", volume: 0.2}),
			cashout: new Howl({src: "./sounds/sfx_sounds_fanfare3.wav", volume: 0.2}),
			error: new Howl({src: "./sounds/sfx_sounds_error3.wav", volume: 0.2}),
			button: new Howl({src: "./sounds/sfx_menu_move4.wav", volume: 0.2}),
		};
	}

	async createSpritesheets() {
		this.spritesheets = {
			bomb: await this.createBombSpritesheet(),
			coin: await this.createCoinSpritesheet(),
			stoneBreak: await this.createStoneBreakSpritesheet(),
		};
	}
	async createStoneBreakSpritesheet(stoneRubbleTexture) {
		const stoneRubbleAtlasData = {
			frames: {
				break1: {
					frame: {x: 0, y: 0, w: 32, h: 32},
					sourceSize: {w: 32, h: 32},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 32},
				},
				break2: {
					frame: {x: 32, y: 0, w: 32, h: 32},
					sourceSize: {w: 32, h: 32},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 32},
				},
				break3: {
					frame: {x: 64, y: 0, w: 32, h: 32},
					sourceSize: {w: 32, h: 32},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 32},
				},
				break4: {
					frame: {x: 96, y: 0, w: 32, h: 32},
					sourceSize: {w: 32, h: 32},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 32},
				},
				break5: {
					frame: {x: 128, y: 0, w: 32, h: 32},
					sourceSize: {w: 32, h: 32},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 32},
				},
				break6: {
					frame: {x: 160, y: 0, w: 32, h: 32},
					sourceSize: {w: 32, h: 32},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 32},
				},
				break7: {
					frame: {x: 192, y: 0, w: 32, h: 32},
					sourceSize: {w: 32, h: 32},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 32},
				},
				break8: {
					frame: {x: 224, y: 0, w: 32, h: 32},
					sourceSize: {w: 32, h: 32},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 32},
				},
			},
			meta: {
				image: stoneRubbleTexture,
				size: {w: 8 * 32, h: 32},
			},
			animations: {
				break: ["break1", "break2", "break3", "break4", "break5", "break6", "break7", "break8"],
			},
		};

		const spritesheet = new PIXI.Spritesheet(this.textures.stoneRubble, stoneRubbleAtlasData);
		await spritesheet.parse();
		return spritesheet;
	}

	async createCoinSpritesheet(coinTexture) {
		const coinAtlasData = {
			frames: {
				coin1: {
					frame: {x: 0, y: 0, w: 16, h: 16},
					sourceSize: {w: 16, h: 16},
					spriteSourceSize: {x: 0, y: 0, w: 16, h: 16},
				},
				coin2: {
					frame: {x: 16, y: 0, w: 16, h: 16},
					sourceSize: {w: 16, h: 16},
					spriteSourceSize: {x: 0, y: 0, w: 16, h: 16},
				},
				coin3: {
					frame: {x: 32, y: 0, w: 16, h: 16},
					sourceSize: {w: 16, h: 16},
					spriteSourceSize: {x: 0, y: 0, w: 16, h: 16},
				},
				coin4: {
					frame: {x: 48, y: 0, w: 16, h: 16},
					sourceSize: {w: 16, h: 16},
					spriteSourceSize: {x: 0, y: 0, w: 16, h: 16},
				},
				coin5: {
					frame: {x: 64, y: 0, w: 16, h: 16},
					sourceSize: {w: 16, h: 16},
					spriteSourceSize: {x: 0, y: 0, w: 16, h: 16},
				},
				coin6: {
					frame: {x: 80, y: 0, w: 16, h: 16},
					sourceSize: {w: 16, h: 16},
					spriteSourceSize: {x: 0, y: 0, w: 16, h: 16},
				},
				coin7: {
					frame: {x: 96, y: 0, w: 16, h: 16},
					sourceSize: {w: 16, h: 16},
					spriteSourceSize: {x: 0, y: 0, w: 16, h: 16},
				},
				coin8: {
					frame: {x: 112, y: 0, w: 16, h: 16},
					sourceSize: {w: 16, h: 16},
					spriteSourceSize: {x: 0, y: 0, w: 16, h: 16},
				},
			},
			meta: {
				image: coinTexture,
				size: {w: 8 * 32, h: 64},
			},
			animations: {
				coin: ["coin1", "coin2", "coin3", "coin4", "coin5", "coin6", "coin7", "coin8"],
			},
		};

		const spritesheet = new PIXI.Spritesheet(this.textures.coin, coinAtlasData);
		await spritesheet.parse();
		return spritesheet;
	}
	async createBombSpritesheet() {
		const bombAtlasData = {
			frames: {
				bomb1: {
					frame: {x: 0, y: 0, w: 32, h: 64},
					sourceSize: {w: 32, h: 64},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 64},
				},
				bomb2: {
					frame: {x: 32, y: 0, w: 32, h: 64},
					sourceSize: {w: 32, h: 64},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 64},
				},
				bomb3: {
					frame: {x: 64, y: 0, w: 32, h: 64},
					sourceSize: {w: 32, h: 64},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 64},
				},
				bomb4: {
					frame: {x: 96, y: 0, w: 32, h: 64},
					sourceSize: {w: 32, h: 64},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 64},
				},
				bomb5: {
					frame: {x: 128, y: 0, w: 32, h: 64},
					sourceSize: {w: 32, h: 64},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 64},
				},
				bomb6: {
					frame: {x: 160, y: 0, w: 32, h: 64},
					sourceSize: {w: 32, h: 64},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 64},
				},
				bomb7: {
					frame: {x: 192, y: 0, w: 32, h: 64},
					sourceSize: {w: 32, h: 64},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 64},
				},
				bomb8: {
					frame: {x: 224, y: 0, w: 32, h: 64},
					sourceSize: {w: 32, h: 64},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 64},
				},
				bomb9: {
					frame: {x: 256, y: 0, w: 32, h: 64},
					sourceSize: {w: 32, h: 64},
					spriteSourceSize: {x: 0, y: 0, w: 32, h: 64},
				},
			},
			meta: {images: {image: this.textures.bomb, size: {w: 288, h: 352}}},
			animations: {bomb: ["bomb1", "bomb2", "bomb3", "bomb4", "bomb5", "bomb6", "bomb7", "bomb8", "bomb9"]},
		};

		const spritesheet = new PIXI.Spritesheet(this.textures.bomb, bombAtlasData);
		await spritesheet.parse();
		return spritesheet;
	}
}

export default Assets;
