import { GameStarFury } from "../gameStarFury.js";
import { Geometry } from "./geometry.js";
import { Pop } from "./pop.js";

export class Asteroid extends Geometry {

    public isExploded = false;

    constructor(x: number, y: number, scale: number, xVel: number, yVel: number, aVel: number) {
        super(x, y, scale, xVel, yVel, aVel)
        this.isMirrored = false;
        this.points = [
            { action: 'm', x: -0.33, y: 0.5 },
            { action: 'l', x: -0.5, y: 0.16 },
            { action: 'l', x: -0.45, y: -0.5 },
            { action: 'l', x: -0.5, y: -0.16 },
            { action: 'l', x: 0.33, y: -0.5 },
            { action: 'l', x: 0.16, y: 0.25},
            { action: 'l', x: 0.16, y: 0.45 },
            { action: 'l', x: -0.5, y: 0.5 },
            { action: 'l', x: -0.33, y: 0.5 }
        ]

        this.hitbox = {
            x: -0.5,
            y: -0.5,
            width: 1,
            height: 1
        }

        this.isShootable = true;

        this.strokeStyle = 'purple';
    }

    update(delta: number, game: GameStarFury) {
        super.update(delta, game);
        if (this.isExploded) {
            game.geometries.push(new Pop(Math.random() * 50 + 50, this.x, this.y, this.scale * 1.5));
            this.done = true;
            this.isExploded = false;
        }
    }
}