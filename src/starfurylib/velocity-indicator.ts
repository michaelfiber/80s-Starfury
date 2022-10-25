import { GameStarFury } from "../gameStarFury.js";
import { Geometry } from "./geometry.js";
import { Ship } from "./ship.js";

export class VelocityIndicator extends Geometry {
    constructor(public ship: Ship) {
        super(0, 0, ship.scale);
        this.points = [
            { action: 'm', x: 0, y: 0 },
            { action: 'l', x: 0, y: 1 }
        ]
        this.strokeStyle = 'white';
        this.isMirrored = false;
    }

    update(delta: number, game: GameStarFury) {
        this.points[0].y = this.ship.yVel * 0.1;
        this.points[0].x = this.ship.xVel * 0.1;
        this.points[1].y = this.ship.yVel * 0.4;
        this.points[1].x = this.ship.xVel * 0.4;
        this.x = this.ship.x;
        this.y = this.ship.y;
    }
}