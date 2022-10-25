import { GameRect } from '../game.js';
import { GameStarFury } from '../gameStarFury.js';

export interface GeometryPoint {
    action: 'l' | 'm';
    x: number;
    y: number;
    group?: string;
}

export class Geometry {

    childGeometries: Geometry[] = [];

    angle = 0;
    parallax = 1.0;
    flickerRate = 0.001;

    private _currentFlickerTime = 0;
    private _isFlickeredOut = false;

    isFlickering = false;
    isIgnoringCamera = false;
    isFilled = false;
    isMirrored = true;
    isVisible = true;
    isShootable = false;

    fillStyle?: string | CanvasGradient | CanvasPattern;
    strokeStyle?: string | CanvasGradient | CanvasPattern;
    shadowColor?: string;
    shadowBlur: number = 0;

    done = false;
    points: Array<GeometryPoint> = [];

    overridePoint?: (point: GeometryPoint) => GeometryPoint;

    hitbox?: GameRect;

    adjustedHitbox?: GameRect;

    id?: string;
    missingEntity?: boolean;

    constructor(
        public x: number,
        public y: number,
        public scale: number,
        public xVel: number = 0,
        public yVel: number = 0,
        public aVel: number = 0
    ) { }

    update(delta: number, game: GameStarFury) {
        this.x += this.xVel;
        this.y += this.yVel;
        this.angle += this.aVel;

        if (this.isFlickering) {
            this._currentFlickerTime += delta;
            if (this._currentFlickerTime > this.flickerRate) {
                this._isFlickeredOut = !this._isFlickeredOut;
                this._currentFlickerTime = 0;
            }
        }

        if (this.hitbox) {
            this.adjustedHitbox = {
                x: this.x + this.hitbox.x * this.scale,
                y: this.y + this.hitbox.y * this.scale,
                width: this.hitbox.width * this.scale,
                height: this.hitbox.height * this.scale
            }
        } else {
            this.adjustedHitbox = undefined;
        }

        this.childGeometries.forEach(cg => cg.update(delta, game));
    }

    draw(ctx: CanvasRenderingContext2D, width: number, height: number, camera: { x: number; y: number; }, overallScale: number) {
        if (!this.isVisible || this._isFlickeredOut) return;

        let drawScale = this.scale * this.parallax * overallScale;

        let c = (this.isIgnoringCamera ? { x: 0, y: 0 } : camera);
        let translateX = width / 2 + (this.x - c.x) * overallScale * this.parallax;
        let translateY = height / 2 + (this.y - c.y) * overallScale * this.parallax;

        ctx.strokeStyle = this.strokeStyle || 'green';
        ctx.translate(translateX, translateY);
        ctx.rotate(this.angle);

        if (typeof this.shadowColor == 'string') ctx.shadowColor = this.shadowColor;
        ctx.shadowBlur = this.shadowBlur;

        ctx.beginPath();

        let top: number | undefined = undefined;
        let left: number | undefined = undefined;
        let right: number | undefined = undefined;
        let bottom: number | undefined = undefined;

        ctx.moveTo(0, 0);
        this.points.forEach(p => {
            let point = p;

            if (this.overridePoint) {
                point = this.overridePoint(point);
            }

            if (p.action == 'l') {
                let x = point.x * this.scale * overallScale;
                let y = point.y * this.scale * overallScale;
                ctx.lineTo(x, y);
                if (left === undefined || x < left) left = x;
                if (right === undefined || x > right) right = x;
                if (top === undefined || y < top) top = y;
                if (bottom === undefined || y > bottom) bottom = y;

            } else if (p.action == 'm') ctx.moveTo(point.x * this.scale * overallScale, point.y * this.scale * overallScale);
        });

        if (this.isMirrored) {
            ctx.moveTo(0, 0);
            this.points.forEach(p => {
                let point = p;

                if (this.overridePoint) {
                    point = this.overridePoint(point);
                }

                if (p.action == 'l') {
                    let x = point.x * -1 * drawScale;
                    let y = point.y * drawScale;
                    ctx.lineTo(x, y);
                    if (left === undefined || x < left) left = x;
                    if (right === undefined || x > right) right = x;
                    if (top === undefined || y < top) top = y;
                    if (bottom === undefined || y > bottom) bottom = y;
                }
                else if (p.action == 'm') ctx.moveTo(point.x * -1 * drawScale, point.y * drawScale);
            })
        }

        ctx.stroke();

        if (this.isFilled && this.fillStyle) {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }

        ctx.rotate(-this.angle);

        ctx.translate(-translateX, -translateY);

        /*
        if (this.adjustedHitbox) {
            ctx.strokeStyle = 'purple';
            ctx.strokeRect(this.adjustedHitbox.x * overallScale, this.adjustedHitbox.y * overallScale, this.adjustedHitbox.width * overallScale, this.adjustedHitbox.height * overallScale);
        }
        */
       
        this.childGeometries.forEach(cg => cg.draw(ctx, width, height, camera, overallScale));
    }
}
