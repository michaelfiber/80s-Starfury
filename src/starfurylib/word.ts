import { GameStarFury } from "../gameStarFury.js";
import { Geometry } from "./geometry.js";
import { letters } from "./letter.js";

export class Word extends Geometry {
    lifespan = 0;
    private _lastWord = '';
    width = 0;

    constructor(public word: string, x: number, y: number, scale: number, public vertical?: boolean, private duration?: number, color?: string) {
        super(x, y, scale);
        this.isMirrored = false;
        this._updateWordPoints();
        if (color) this.strokeStyle = color;
        this._lastWord = this.word;
    }

    private _updateWordPoints() {
        let xOffset = 0;
        let yOffset = 0;

        while(this.points.length > 0) this.points.pop();

        for (let letter of this.word) {
            if (letters[letter]) {
                letters[letter].forEach(p => this.points.push({
                    action: p.action,
                    x: p.x + xOffset,
                    y: p.y + yOffset
                }));
                if (this.vertical) yOffset += 1.2;
                else xOffset += 1.2;
                this.points.push({ action: 'm', x: xOffset, y: yOffset });
            }
        }

        this.width = this.word.length * this.scale;
    }

    update(delta: number, game: GameStarFury) {
        super.update(delta, game);

        if (this._lastWord !== this.word) {
            this._updateWordPoints();
            this._lastWord = this.word;
        }

        if (this.duration) {
            this.lifespan += delta;
            if (this.lifespan >= this.duration) this.done = true;
        }
    }
}
