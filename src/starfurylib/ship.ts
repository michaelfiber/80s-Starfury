import { GameStarFury } from "../gameStarFury.js";
import { AiSystem } from "./ai-system.js";
import { Bullet } from "./bullet.js";
import { Relationship } from "./friend-or-foe.js";
import { Geometry } from "./geometry.js";
import { Pop } from "./pop.js";

export class Ship extends Geometry {

    faction = 'neutral';
    isFiring = false;
    currentShotCooldown = 0;
    shotCooldown = 0.15;

    isEnemy?: boolean;
    aiSystem?: AiSystem;

    /**
     * Rate of acceleration - starfury is 6.
     */
    shipSpeed = 12;

    /**
     * Max velocity - starfury is 15.
     */
    shipMaxSpeed = 20;

    /**
     * Rate of rotation - starfury is 0.4;
     */
    rotationSpeed = 0.4;

    /**
     * Max rotation RPMs - starfury is 0.15
     */
    rotationMaxSpeed = 0.3;

    speedMultiplier = 1.0;
    isDoubled = false;
    doublerTimer = 0;
    private _lastLife = 1;
    life = 1;

    isForwardOn = false;
    isBackOn = false;
    isRotLeftOn = false;
    isRotRightOn = false;

    xAmount = 0;
    yAmount = 0;
    private _lastXAmount = 0;
    
    /**
     * The last direction that x fired in.  releasing left and right, aka x==0, does not alter this.
     */
    private _lastXDirection = 0;

    vel = 0;

    engines: Array<{
        positionAngle: number;
        positionDistance: number;
        geometry: Engine;

        /**
         * 
         */
        angleOffset: number;
    }> = [];

    /**
     * 
     * @param x x location
     * @param y y location
     * @param scale scale
     * @param points array of points
     */
    constructor(x: number, y: number, scale: number, points: Array<[x: number, y: number]>, pointXOffset: number, pointYOffset: number, pointScale: number) {
        super(x, y, scale);

        this.isShootable = true;

        //this.isIgnoringCamera = true;

        this.engines = [
            { angleOffset: Math.PI, geometry: new Engine(scale * 0.07), positionAngle: -1.5 * Math.PI / 4, positionDistance: 0.37 },
            { angleOffset: Math.PI, geometry: new Engine(scale * 0.07), positionAngle: 1.5 * Math.PI / 4, positionDistance: 0.37 },
            { angleOffset: 0, geometry: new Engine(scale * 0.1), positionAngle: 0.98 * Math.PI / 1.5, positionDistance: 0.43 },
            { angleOffset: 0, geometry: new Engine(scale * 0.1), positionAngle: -0.98 * Math.PI / 1.5, positionDistance: 0.43 }
        ];



        this.points = [
            { action: 'm', x: pointXOffset / pointScale, y: pointYOffset / pointScale }
        ];

        points.forEach(p => {
            this.points.push({
                action: 'l',
                x: (p[0] + pointXOffset) / pointScale,
                y: (p[1] + pointYOffset) / pointScale
            });
        });

        this.strokeStyle = '#aaaaaa';

        this.hitbox = {
            x: -0.5 + pointXOffset / pointScale,
            y: pointYOffset / pointScale,
            width: 1,
            height: 1
        }
    }

    private _updateAVel(delta: number, game: GameStarFury) {
        if (this.xAmount < 0) {
            this.aVel -= this.rotationSpeed * -this.xAmount * delta;
            this.engines[0].geometry.level += 0.5 * -this.xAmount;
            this.engines[2].geometry.level += 0.5 * -this.xAmount;
        } else if (this.xAmount > 0) {
            this.aVel += this.rotationSpeed * this.xAmount * delta;
            this.engines[1].geometry.level += 0.5 * this.xAmount;
            this.engines[3].geometry.level += 0.5 * this.xAmount;
        }

        if (Math.abs(this.aVel) > this.rotationMaxSpeed) {
            if (this.aVel > 0) this.aVel = this.rotationMaxSpeed;
            else this.aVel = -this.rotationMaxSpeed;
        }

        if ((this.isForwardOn && !this.isRotLeftOn && !this.isRotRightOn) || (this.yAmount !== 0)) {
            this.aVel = this.aVel * 0.9;
        } else {
            this.aVel = this.aVel * 0.9999;
        }

        if (this.aVel < 0 && this.aVel > -0.04 && this.xAmount == 0 && this._lastXDirection > 0) this.aVel = 0;
        if (this.aVel > 0 && this.aVel < 0.04 && this.xAmount == 0 && this._lastXDirection < 0) this.aVel = 0;

        if (this.xAmount !== 0) this._lastXDirection = this.xAmount;
    }

    private _updateFiring(delta: number, game: GameStarFury) {
        if (this.isFiring && this.currentShotCooldown == 0) {
            game.geometries.push(new Bullet(this, this.x + (10 * Math.cos(this.angle - Math.PI / 4)), this.y + (10 * Math.sin(this.angle - Math.PI / 4)), this.scale, this.angle, 30, game.game.ctx));
            game.geometries.push(new Bullet(this, this.x + (10 * Math.cos(this.angle + Math.PI)), this.y + (10 * Math.sin(this.angle + Math.PI)), this.scale, this.angle, 30, game.game.ctx));
            this.currentShotCooldown = this.shotCooldown;
        }

        this.currentShotCooldown -= delta;
        if (this.currentShotCooldown < 0) this.currentShotCooldown = 0;
    }

    update(delta: number, game: GameStarFury) {
        super.update(delta, game);

        if (this.aiSystem) {
            this.aiSystem.update(delta, game.geometries.filter(g => g instanceof Ship && this.aiSystem && g.faction == this.aiSystem.targetFacton));
        }

        let xAmount = this.xAmount;

        /*
        this.xVel -= this.xVel * 0.25 * delta;
        this.yVel -= this.yVel * 0.25 * delta;
        */

        // if (this.isEngineOn) {
        //     this.xVel += this.shipSpeed * delta * Math.cos(this.angle - Math.PI / 2);
        //     this.yVel += this.shipSpeed * delta * Math.sin(this.angle - Math.PI / 2);
        // }

        this.engines.forEach(e => e.geometry.level = 0);

        this._updateAVel(delta, game);

        if (this.yAmount > 0) {
            this.xVel += this.shipSpeed * this.yAmount * delta * Math.cos(this.angle - Math.PI / 2);
            this.yVel += this.shipSpeed * this.yAmount * delta * Math.sin(this.angle - Math.PI / 2);
            this.engines[2].geometry.level += 0.5 * this.yAmount;
            this.engines[3].geometry.level += 0.5 * this.yAmount;
        } else if (this.yAmount < 0) {
            this.xVel += this.shipSpeed * -this.yAmount * delta * Math.cos(this.angle + Math.PI / 2);
            this.yVel += this.shipSpeed * -this.yAmount * delta * Math.sin(this.angle + Math.PI / 2);
            this.engines[0].geometry.level += 0.5 * -this.yAmount;
            this.engines[1].geometry.level += 0.5 * -this.yAmount;
        }

        //if (Math.abs(this.xAmount) < 0.1) this.aVel = 0;

        /*
        else if (this.isForwardOn) {
            this.xVel += this.shipSpeed * delta * Math.cos(this.angle - Math.PI / 2);
            this.yVel += this.shipSpeed * delta * Math.sin(this.angle - Math.PI / 2);
            this.engines[2].geometry.level += 0.5;
            this.engines[3].geometry.level += 0.5;

            if (this.isRotLeftOn) {
                this.aVel -= this.rotationSpeed * delta * 0.8;
                this.engines[0].geometry.level += 0.5;
                this.engines[2].geometry.level += 0.5;
            }

            if (this.isRotRightOn) {
                this.aVel += this.rotationSpeed * delta * 0.8;
                this.engines[1].geometry.level += 0.5;
                this.engines[3].geometry.level += 0.5;
            }
        } else {
            if (this.isRotLeftOn) {
                this.aVel -= this.rotationSpeed * delta;
                this.engines[0].geometry.level += 0.5;
                this.engines[2].geometry.level += 0.5;
            }

            if (this.isRotRightOn) {
                this.aVel += this.rotationSpeed * delta;
                this.engines[1].geometry.level += 0.5;
                this.engines[3].geometry.level += 0.5;
            }
        }

        if (this.isBackOn) {
            this.xVel += this.shipSpeed * delta * Math.cos(this.angle + Math.PI / 2);
            this.yVel += this.shipSpeed * delta * Math.sin(this.angle + Math.PI / 2);
            this.engines[0].geometry.level += 0.5;
            this.engines[1].geometry.level += 0.5;
        }
        */

        this.engines.forEach(e => {
            e.geometry.x = this.x + (Math.cos(this.angle + e.positionAngle - Math.PI / 2) * e.positionDistance * this.scale);
            e.geometry.y = this.y + (Math.sin(this.angle + e.positionAngle - Math.PI / 2) * e.positionDistance * this.scale);
            e.geometry.angle = this.angle + e.angleOffset;
            if (e.geometry.level > 1) e.geometry.level = 1;
            e.geometry.update();
        });

        this.vel = Math.sqrt((this.xVel * this.xVel) + (this.yVel * this.yVel));

        if (this.vel > this.shipMaxSpeed) {
            this.xVel = this.xVel * (this.shipMaxSpeed / this.vel);
            this.yVel = this.yVel * (this.shipMaxSpeed / this.vel);
        }


        this.doublerTimer -= delta;
        if (this.doublerTimer <= 0) {
            this.isDoubled = false;
            this.doublerTimer = 0;
        }

        if (this._lastLife !== this.life) {
            this._lastLife = this.life;
            if (this.life <= 0) {
                // asplode
                game.geometries.push(new Pop(Math.floor(Math.random() * 50) + 50, this.x, this.y, this.scale * 1.5, this.xVel, this.yVel));
                this.done = true;
            } else {
                // puff
                game.geometries.push(new Pop(Math.floor(Math.random() * 25), this.x, this.y, this.scale, this.xVel, this.yVel));
            }
        }

        this._lastXAmount = xAmount;
        this._updateFiring(delta, game);
    }

    draw(ctx: CanvasRenderingContext2D, width: number, height: number, camera: { x: number; y: number; }, overallScale: number) {
        super.draw(ctx, width, height, camera, overallScale);

        this.engines.forEach(e => e.geometry.draw(ctx, width, height, camera, overallScale));
    }

}


export class Engine extends Geometry {
    level = 0;
    constructor(scale: number) {
        // just set x,y to 0 because location must be updated every tick anyway and it starts out invisible.
        super(0, 0, scale);
        this.isVisible = true;

        this.points = [
            { action: 'm', x: -0.5, y: 0 },
            { action: 'l', x: 0, y: 1, },
            { action: 'l', x: 0.5, y: 0 },
            { action: 'l', x: -0.5, y: 0 }
        ]

        this.strokeStyle = '#aaccff';
    }
    update() {
        this.points[1].y = this.level + Math.random() * this.level * 3;
        this.isVisible = this.level !== 0;
    }
}
