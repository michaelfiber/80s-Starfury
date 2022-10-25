import { Geometry } from "./geometry.js";

export class Rectangle extends Geometry {
    constructor(x: number, y: number, scale: number) {
        super(x, y, scale);
        this.points = [
            { action: 'm', x: -0.5, y: -0.5 },
            { action: 'l', x: 0.5, y: -0.5 },
            { action: 'l', x: 0.5, y: 0.5 },
            { action: 'l', x: -0.5, y: 0.5 }, 
            { action: 'l', x: -0.5, y: -0.5 }
        ]

        this.strokeStyle = 'red';
    }
}