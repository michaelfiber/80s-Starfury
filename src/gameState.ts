import { Game, GameEvent } from './game.js';

export abstract class GameState {

    /**
     * Draw this state on top of the state below it, good for popups and menus.
     */
    drawOverStates = false;

    /**
     * when true, the state will be removed from the stack. handy for intros that only play once.
     */
    done = false;

    constructor(public name: string, protected game: Game) { }
    abstract update(time: number, delta: number, events: Array<GameEvent>): void;
    abstract draw(): void;
}

