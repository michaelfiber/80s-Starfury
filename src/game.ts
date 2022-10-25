import { GameState } from './gameState.js';
import { GetElementCursorPosition } from './util.js';
import { Keyboard } from './keyboard.js';

export interface GameEvent {
    x?: number;
    y?: number;
    key?: string;
    type: string;
}

export interface GameRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Game {
    isDestroying = false;
    showDebug = false;
    canvas: HTMLCanvasElement;
    gameStates: GameState[] = [];
    ctx: CanvasRenderingContext2D;
    lastTime: number = 0;
    rafReference: number = 0;
    gameEvents: Array<GameEvent> = [];

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    constructor() {
        this.canvas = document.createElement('canvas');

        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        document.body.appendChild(this.canvas);
        this.canvas.addEventListener('click', (ev) => {
            this.gameEvents.push({ type: 'click', ...GetElementCursorPosition(this.canvas, ev) });
        });

        this.canvas.addEventListener('mousedown', (ev) => {
            this.gameEvents.push({ type: 'mousedown', ...GetElementCursorPosition(this.canvas, ev) });
        });

        this.canvas.addEventListener('mouseup', (ev) => {
            this.gameEvents.push({ type: 'mouseup', ...GetElementCursorPosition(this.canvas, ev) });
        });

    }

    play() {
        this._loop(0);
    }

    destroy() {
        this.isDestroying = true;
        cancelAnimationFrame(this.rafReference);
        document.body.removeChild(this.canvas);
    }

    private _loop(time: number) {

        let keyboardEvents = Keyboard.getEvents();
        keyboardEvents.forEach(kev => this.gameEvents.push({
            type: kev.type,
            key: kev.key
        }));

        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx.fillStyle = 'CornflowerBlue';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let loopEvents: Array<GameEvent> = [];
        while (this.gameEvents.length > 0) loopEvents.push(this.gameEvents.shift() as GameEvent);

        if (this.gameStates.length > 0) {

            // update the top state.
            this.gameStates[this.gameStates.length - 1].update(time, delta, loopEvents);

            // add the top state to the list of states to draw.
            let statesToDraw: GameState[] = [this.gameStates[this.gameStates.length - 1]];

            // If there is more than 1 state and the top state is set to drawOverStates, work back through the stack adding layers to draw.
            if (this.gameStates.length > 1 && this.gameStates[this.gameStates.length - 1].drawOverStates) {
                for (let i = this.gameStates.length - 2; i >= 0; i--) {
                    statesToDraw.push(this.gameStates[i]);

                    // If this layer does not support drawOverStates than any states below it will be hidden, so stop getting states now.
                    if (!this.gameStates[i].drawOverStates) break;
                }
            }

            // work through the stack from last to first drawing each level.
            let state = statesToDraw.pop();
            while (state) {
                state.draw();
                state = statesToDraw.pop();
            }
        } else {
            this.ctx.textBaseline = 'top'
            this.ctx.font = '32px arial';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText('No game state', 0, 0);
        }

        for (let state of this.gameStates) {
            if (state.done) this.gameStates.splice(this.gameStates.indexOf(state), 1);
        }

        if (this.showDebug) {
            this.ctx.textBaseline = 'top';
            this.ctx.fillStyle = 'red';
            this.ctx.strokeStyle = '1px black';
            this.ctx.font = '32px arial';
            this.ctx.fillText(this.gameStates.length.toString(), 0, 0);
            this.ctx.strokeText(this.gameStates.length.toString(), 0, 0);

            let y = 30;
            for (let state of this.gameStates) {
                this.ctx.fillText(state.name, 0, y);
                this.ctx.strokeText(state.name, 0, y);
                y += 30;
            }
        }

        if (!this.isDestroying) {
            this.rafReference = requestAnimationFrame((time) => {
                this._loop(time);
            });
        }
    }
}
