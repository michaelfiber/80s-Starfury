import { Button } from "./button.js";
import { Game, GameEvent } from "./game.js";
import { GameState } from "./gameState.js";
import { GameStarFury } from "./gameStarFury.js";

export class GameStateMenu extends GameState {
    buttons: Button[] =[];
    startButton: Button;
    constructor(game: Game) {
        super('menu', game);
        
        this.startButton = new Button(this.game.width / 2, 100, 'Start Star Fury');
        this.startButton.fontStyle = '64px arial';
        this.startButton.addClickListener(() => {
            this.game.gameStates.push(new GameStarFury(this.game));
        });

        this.buttons.push(this.startButton);
    }

    update(time: number, delta: number, events: GameEvent[]) {
        Button.CheckEvents(events, this.buttons);
        this.startButton.x = this.game.width / 2;
    }

    draw() {
        let ctx = this.game.ctx;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.game.width, this.game.height);

        for (let button of this.buttons) {
            button.draw(ctx);
        }
    }
}