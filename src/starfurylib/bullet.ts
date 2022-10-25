import { GameStarFury } from "../gameStarFury.js";
import { Asteroid } from "./asteroid.js";
import { Geometry } from "./geometry.js";
import { Raider } from "./raider.js";
import { Ship } from "./ship.js";

export class Bullet extends Geometry {
    lifespan = 0;
    owner: Geometry | null;

    constructor(owner: Geometry, x: number, y: number, scale: number, angle: number, velocity: number, ctx: CanvasRenderingContext2D) {
        super(x, y, scale, velocity * Math.sin(angle), velocity * Math.cos(angle - Math.PI));
        this.owner = owner;
        this.angle = angle;
        this.points = [
            { action: 'm', x: 0, y: 0.5 },
            { action: 'l', x: 0, y: 0 }
        ];
        this.strokeStyle = ctx.createLinearGradient(0, 0, 0, 0.5 * this.scale);
        this.strokeStyle.addColorStop(0, '#aaaaff');
        this.strokeStyle.addColorStop(0.5, '#ffffff');
        this.strokeStyle.addColorStop(1, '#aaaaff');
        this.hitbox = {
            x: -0.1,
            y: -0.1,
            width: 0.2,
            height: 0.2
        }
    }

    hit(item: Geometry) {
        if (this.owner && (item == this.owner || (item instanceof Ship && item.faction == (this.owner as Ship).faction))) return;

        if (item instanceof Ship) {
            item.life -= 0.1;
        } else if (item instanceof Asteroid) {
            (item as Asteroid).isExploded = true;
        }

        this.done = true;
        this.owner = null;
    }

    update(delta: number, game: GameStarFury) {
        super.update(delta, game);
        this.lifespan += delta;
        if (this.lifespan > 1) return this.done = true;
    }
}