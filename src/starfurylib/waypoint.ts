import { Geometry } from "./geometry.js";
import { GameStarFury } from '../gameStarFury.js';
import { Ship } from "./ship.js";
import { isColliding } from "../util.js";

export class Waypoint extends Geometry {
    constructor(x: number, y: number, scale: number) {
        super(x, y, scale);
        this.points = [
            { action: 'm', x: -0.5, y: -0.4 },
            { action: 'l', x: -0.5, y: -0.5 },
            { action: 'l', x: -0.4, y: -0.5 },
            { action: 'm', x: 0.4, y: -0.5 },
            { action: 'l', x: 0.5, y: -0.5 },
            { action: 'l', x: 0.5, y: -0.4 },
            { action: 'm', x: 0.5, y: 0.4 },
            { action: 'l', x: 0.5, y: 0.5 },
            { action: 'l', x: 0.4, y: 0.5 },
            { action: 'm', x: -0.4, y: 0.5 },
            { action: 'l', x: -0.5, y: 0.5 },
            { action: 'l', x: -0.5, y: 0.4 }
        ];
        this.strokeStyle = 'blue';
        this.hitbox = {
            x: -0.5, 
            y: -0.5,
            width: 1,
            height: 1
        }
    }

    update(delta: number, game: GameStarFury) {
        super.update(delta, game);
        game.geometries.filter(g => g.hitbox && g instanceof Ship).forEach(g => {
            if (g.adjustedHitbox && this.adjustedHitbox) {
                if (isColliding(g.adjustedHitbox, this.adjustedHitbox)) this.done = true;
            }
        });
    }
}