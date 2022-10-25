import { Ship } from "./ship.js";


export const starfuryPoints: Array<[x: number, y: number]> = [
    [13, 0],
    [35, 31],
    [40, 21],
    [58, 21],
    [60, 38],
    [129, 129],
    [281, 225],
    [294, 225],
    [312, 209],
    [316, 141],
    [322, 132],
    [359, 128],
    [372, 137],
    [387, 198],
    [430, 210],
    [433, 237],
    [418, 245],
    [407, 268],
    [404, 289],
    [417, 352],
    [429, 355],
    [473, 466],
    [494, 564],
    [440, 467],
    [423, 414],
    [409, 452],
    [400, 461],
    [348, 466],
    [339, 457],
    [327, 430],
    [317, 421],
    [314, 448],
    [237, 527],
    [298, 397],
    [284, 384],
    [181, 334],
    [168, 357],
    [129, 336],
    [119, 301],
    [67, 301],
    [60, 304],
    [25, 307],
    [22, 314],
    [0, 317]
];

export class Starfury extends Ship {
    constructor(x: number, y: number, scale: number) {
        super(x, y, scale, starfuryPoints, 0, -275, 1000);
        this.life = 2;
    }
}

export class NpcStarfury extends Starfury {
    constructor(x: number, y: number, scale: number) {
        super(x, y, scale);
        this.shipMaxSpeed = this.shipSpeed * 0.5;
        this.shipSpeed = this.shipSpeed * 0.5;
        this.rotationMaxSpeed = this.rotationMaxSpeed * 0.5;
        this.rotationSpeed = this.rotationSpeed * 0.5;
    }
}