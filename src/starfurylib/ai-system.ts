import { Geometry } from "./geometry.js";
import { Ship } from "./ship.js";

export class AiSystem {
    constructor(public ship: Ship, public targetFacton: string) {}
    private _updateCountdown = 0;
    updateRate = 0.05;

    update(delta: number, foes: Geometry[]) {
        if (this._updateCountdown > 0) {
            this._updateCountdown -= delta;
            return;
        }     
        this._updateCountdown = this.updateRate;
        if (foes.length == 0) {
            this.ship.yAmount = 0;
        } else {
            //this.ship.yAmount = 1;

            // find the closest foe.
            let closestDistance = 99999999;
            let closestFoe: Geometry | undefined = undefined;

            for (let foe of foes) {
                let dist = Math.hypot(foe.x - this.ship.x, foe.y - this.ship.y);
                if (dist < closestDistance) {
                    closestDistance = dist;
                    closestFoe = foe;
                }
            }

            if (closestFoe) {
                let angle = Math.atan2(this.ship.y - closestFoe.y,this.ship.x - closestFoe.x) - Math.PI / 2;
                if (Math.abs(this.ship.angle - angle) < 0.005) {
                    this.ship.angle = angle;
                    this.ship.xAmount = 0;
                }
                else if (this.ship.angle !== angle) {
                    if (this.ship.angle > angle) this.ship.xAmount = (-(Math.PI * 2 - angle) / Math.PI * 2) * 0.5;
                    else if (this.ship.angle < angle) this.ship.xAmount = ((Math.PI * 2 - angle) / Math.PI * 2) * 0.5;
                } 

                if (Math.abs(this.ship.angle - angle) < 0.05) {
                    this.ship.isFiring = true;
                } else {
                    this.ship.isFiring = false;
                }

                this.ship.yAmount = 1;
            }
        }
    }
}