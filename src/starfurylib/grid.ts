import { Geometry } from "./geometry.js";

export class Grid extends Geometry {
    constructor(rows: number, cols: number, ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
        super(x, y, scale);
        
        for (let i = 0; i < rows; i++) {
            this.points.push({ action: 'm', x: 0, y: i / rows });
            this.points.push({ action: 'l', x: 1, y: i / rows });
        }

        for (let i = 0; i < cols; i++) {
            this.points.push({ action: 'm', x: i / cols, y: 0 });
            this.points.push({ action: 'l', x: i  / cols, y: 1 });
        }

        // the grid is 1x1. Shift by -0.5 so it is centered on 0,0
        this.points.forEach(p => {
            p.x -= 0.5;
            p.y -= 0.5;
        });

        this.strokeStyle = '#000044';
    }
}
