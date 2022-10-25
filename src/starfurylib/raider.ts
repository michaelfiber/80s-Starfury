import { GameStarFury } from "../gameStarFury.js";
import { AiSystem } from "./ai-system.js";
import { Engine, Ship } from "./ship.js";

const raiderPoints: Array<[x: number, y: number]> = [
    [500, 600],
    [0, 600]
]

export enum RaiderPattern {
    random
}

export class Raider extends Ship {
    courseChange = 0;

    constructor(x: number, y: number, scale: number, public pattern: RaiderPattern) {
        super(x, y, scale, raiderPoints, 0, -400, 1000);
        this.shipSpeed = 1;
        this.shipMaxSpeed = 8;
        this.rotationSpeed = 0.1;
        this.rotationMaxSpeed = 0.025;
        this.shotCooldown = 0.6;

        this.engines = [
            { angleOffset: Math.PI * 3 / 4, geometry: new Engine(scale * 0.07), positionAngle: -1.8 * Math.PI / 4, positionDistance: 0.37 },
            { angleOffset: Math.PI * 5 / 4, geometry: new Engine(scale * 0.07), positionAngle: 1.8 * Math.PI / 4, positionDistance: 0.37 },
            { angleOffset: 0, geometry: new Engine(scale * 0.1), positionAngle: 0.98 * Math.PI / 1.34, positionDistance: 0.43 },
            { angleOffset: 0, geometry: new Engine(scale * 0.1), positionAngle: -0.98 * Math.PI / 1.34, positionDistance: 0.43 }
        ];
    }

    reactToHit() {
        this.courseChange = 0;
    }

    update(delta: number, game: GameStarFury) {
        super.update(delta, game);

        /*
        if (this.pattern == RaiderPattern.random) {
            this.isForwardOn = true;
            this.courseChange -= delta;
            if (this.courseChange <= 0 && !this.isRotRightOn && !this.isRotLeftOn) {
                console.log('do course change!');
                if (Math.random() < 0.5) this.isRotRightOn = true;
                else this.isRotLeftOn = true;
                console.log(this.isRotRightOn, this.isRotLeftOn);
                setTimeout(() => {
                    this.isRotRightOn = false;
                    this.isRotLeftOn = false;
                    this.courseChange = Math.random() * 20;
                    console.log('stop course change');
                }, Math.random() * 500);
            }
        }
        */
    }
}