import { GameStarFury } from "../gameStarFury.js";
import { Geometry } from "./geometry.js";

export class Pop extends Geometry {
    particles: Array<{
        angle: number;
        length: number;
        duration: number;
    }> = [];

    constructor(public particleCount: number, x: number, y: number, scale: number, xVel = 0, yVel = 0) {
        super(x, y, scale);
        this.xVel = xVel;
        this.yVel = yVel;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                angle: Math.PI * 2 * Math.random(),
                length: Math.random() - 0.5,
                duration: Math.random() * 3
            });
        }
        this.isMirrored = false;
        this.strokeStyle = 'yellow';
    }

    update(delta: number, game: GameStarFury) {
        super.update(delta, game);
        this.points = [];

        let count = 0;

        this.particles.filter(p => p.duration > 0).forEach(p => {
            count++;
            p.length += p.length * 0.5 * delta;
            this.points.push({ action: 'm', x: 0, y: 0 });
            this.points.push({
                action: 'm', x: Math.sin(p.angle) * (p.length * 0.9), y: Math.cos(p.angle) * (p.length * 0.9)
            });
            this.points.push({
                action: 'l', x: Math.sin(p.angle) * p.length, y: Math.cos(p.angle) * p.length
            });
            p.duration -= delta;
        });

        this.done = count == 0;

    }
}