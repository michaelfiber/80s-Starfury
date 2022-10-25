import { GameEvent, GameRect } from "./game.js";
import { isInside } from "./util.js";

export class Button {

    static CheckEvents(events: GameEvent[], buttons: Button[]) {
        events.forEach(event => {
            if (event.type == 'click') {
                for (let button of buttons) {
                    if (typeof event.x == 'number' && typeof event.y == 'number' && isInside({ x: event.x, y: event.y }, button.boundingBox)) {
                        button.click();
                        break;
                    }
                }
            } else if (event.type == 'mousedown') {
                for (let button of buttons) {
                    if (typeof event.x == 'number' && typeof event.y == 'number' && isInside({ x: event.x, y: event.y }, button.boundingBox)) {
                        button.mouseDown();
                        break;
                    }
                }                
            } else if (event.type == 'mouseup') {
                for (let button of buttons) {
                    if (typeof event.x == 'number' && typeof event.y == 'number' && isInside({ x: event.x, y: event.y }, button.boundingBox)) {
                        button.mouseUp();
                        break;
                    }
                }                   
            }
        });
    }

    border = 'black';
    background = 'white';
    color = 'black';
    width = 0;
    height = 0;

    boundingBox: GameRect = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }

    private _clicks: Array<() => void> = [];
    private _mouseDowns: Array<() => void> = [];
    private _mouseUps: Array<() => void> = [];

    constructor(public x: number, public y: number, public label: string, public fontStyle = '16px arial') {}

    addClickListener(cb: () => void) {
        this._clicks.push(cb);
    }

    addMouseDownListener(cb: () => void) {
        this._mouseDowns.push(cb);
    }

    addMouseUpListener(cb: () => void) {
        this._mouseUps.push(cb);
    }

    mouseDown() {
        this._mouseDowns.forEach(cb => cb());
    }

    mouseUp() {
        this._mouseUps.forEach(cb => cb());
    }

    click() {
        this._clicks.forEach(cb => cb());
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.font = this.fontStyle;
        let measure = ctx.measureText(this.label);

        this.width = measure.actualBoundingBoxRight + 20;
        this.height = measure.actualBoundingBoxAscent + 20;

        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.background;
        ctx.strokeStyle = this.border;

        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

        ctx.fillStyle = this.color;
        ctx.fillText(this.label, this.x - measure.width / 2, this.y);

        this.boundingBox.x = this.x - this.width / 2;
        this.boundingBox.y = this.y - this.height / 2;
        this.boundingBox.width = this.width;
        this.boundingBox.height = this.height;
    }
}