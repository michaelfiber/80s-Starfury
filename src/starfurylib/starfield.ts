import { Geometry } from "./geometry.js";
import { Star } from "./star.js";

export class Starfield extends Geometry {
    stars: Star[] = [];

    constructor(scale: number) {
        super(0, 0, scale);
        for (let i = 0; i < 500; i++) {
            this.stars.push(new Star(Math.random() * scale - scale / 2, Math.random() * scale - scale / 2, Math.random() * 2));
        }
        this.stars.forEach(s => s.parallax = Math.random() * 0.05);
    }

    draw(ctx: CanvasRenderingContext2D, width: number, height: number, camera: { x: number; y: number }, overallScale: number) {
        this.stars.forEach(s => {
            let translateX = width / 2 + (s.x - camera.x) * overallScale * s.parallax;
            let translateY = height / 2 + (s.y - camera.y) * overallScale * s.parallax;
            if (Math.abs(translateX) < width && Math.abs(translateY) < height) {
                s.draw(ctx, width, height, camera, overallScale);
            }
        });
    }
}