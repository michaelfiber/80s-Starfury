import { Game } from "./game.js";
import { GameState } from "./gameState.js";
import { GameStateMenu } from "./gameStateMenu.js";

export class GameStateTitle extends GameState {
    constructor(game: Game) {
        super('title', game);
    }

    color = 0;
    direction = 1;

    update(time: number, delta: number) {
        this.color += (100 * delta) * this.direction;
        if (this.color > 255) {
            this.color = 255;
            this.direction = -1;
        } else if (this.color < 0) {
            this.color = 0;
            this.direction = 0;
            this.done = true;
            this.game.gameStates.push(new GameStateMenu(this.game));
        }
    }

    draw() {
        const ctx = this.game.ctx;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.game.width, this.game.height);

        ctx.fillStyle = `rgb(${this.color}, ${this.color}, ${this.color})`;
        ctx.font = '64px arial';
        let measure = ctx.measureText('ASTEROIDS-ZENECA');

        ctx.textBaseline = 'middle';
        ctx.fillText('ASTEROIDS-ZENECA', this.game.width / 2 - measure.width / 2, this.game.height / 2);

    }
}