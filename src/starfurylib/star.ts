import { Geometry } from "./geometry.js";

export class Star extends Geometry {
    constructor(x: number, y: number, scale: number) {
        super(x, y, scale);
        this.points = [
            { action: 'm', x: 0, y: -0.5 },
            { action: 'l', x: 0.5, y: 0 },
            { action: 'l', x: 0, y: 0.5 },
            { action: 'l', x: -0.5, y: 0 },
            { action: 'l', x: 0, y: -0.5 }
        ]
        this.strokeStyle = 'white';
        this.isMirrored = false;
        this.isFilled = true;
        this.fillStyle = 'white';
    }
}