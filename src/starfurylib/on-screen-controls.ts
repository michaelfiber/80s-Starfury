export class OnScreenControls {

    ongoingTouches: Array<{ x: number; y: number; identifier: number }> = [];

    xAxis = 0;
    yAxis = 0;
    isFiring = false;

    constructor(public canvas: HTMLCanvasElement) {
        canvas.addEventListener('touchstart', this.touchHandler.bind(this));
        canvas.addEventListener('touchmove', this.touchHandler.bind(this));
        canvas.addEventListener('touchend', this.touchEnd.bind(this));
    }

    touchEnd(e: TouchEvent) {
        e.preventDefault();

        for (let i = 0; i < e.changedTouches.length; i++) {
            let touch = e.changedTouches[i];
            let existing = this.ongoingTouches.filter(o => o.identifier == touch.identifier);
            for (let e of existing) {
                this.ongoingTouches.splice(this.ongoingTouches.indexOf(e), 1);
            }
        }
    }

    touchHandler(e: TouchEvent) {
        e.preventDefault();

        let touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            let existing = this.ongoingTouches.filter(o => o.identifier == touches[i].identifier);
            if (existing.length == 1) {
                existing[0].x = touches[i].pageX;
                existing[0].y = touches[i].pageY;
            } else {
                this.ongoingTouches.push({
                    x: touches[i].pageX,
                    y: touches[i].pageY,
                    identifier: touches[i].identifier
                });
            }
        }
    }

    scale = 1;
    dirCircleoffset = 300
    dirCircleRadius = 190
    dirDeadzone = 40
    dirRange = 140
    fireOffset = 200;
    fireRadius = 90;

    update(width: number, height: number) {
        this.scale = width / 1920;
        let scale = this.scale;
        this.dirCircleoffset = 300 * scale;
        this.dirCircleRadius = 190 * scale;
        this.dirDeadzone = 40 * scale;
        this.dirRange = 140 * scale;

        let inRange = this.ongoingTouches.filter(o => o.x > this.dirCircleoffset - this.dirCircleRadius && o.x < this.dirCircleoffset + this.dirCircleRadius && o.y > height - this.dirCircleoffset - this.dirCircleRadius && o.y < height - this.dirCircleoffset + this.dirCircleRadius);
        if (inRange.length > 0) {
            let x = inRange[0].x - this.dirCircleoffset;
            let y = height - this.dirCircleoffset - inRange[0].y;
            
            if (Math.abs(x) <= this.dirDeadzone) x = 0;
            if (Math.abs(y) <= this.dirDeadzone) y = 0;

            if (x < -this.dirCircleRadius) x = -this.dirCircleRadius;
            else if (x > this.dirCircleRadius) x = this.dirCircleRadius;
            if (y < -this.dirCircleRadius) y = -this.dirCircleRadius;
            else if (y > this.dirCircleRadius) y = this.dirCircleRadius;

            if (x > 0) this.xAxis = (x - this.dirDeadzone) / this.dirRange;
            else if (x < 0) this.xAxis = (x + this.dirDeadzone) / this.dirRange;

            if (y > 0) this.yAxis = (y - this.dirDeadzone) / this.dirRange;
            else if (y < 0) this.yAxis = (y + this.dirDeadzone) / this.dirRange;
        } else {
            this.xAxis = 0;
            this.yAxis = 0;
        }

        this.fireOffset = 200 * scale;
        this.fireRadius = 90 * scale;
        let fireRange = this.ongoingTouches.filter(o => o.x > width - this.fireOffset - this.fireRadius && o.x < width - this.fireOffset + this.fireRadius && o.y > height - this.fireOffset - this.fireRadius && o.y < height - this.fireOffset + this.fireRadius);
        this.isFiring = fireRange.length !== 0;
    }

    draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.dirCircleoffset, height - this.dirCircleoffset, this.dirCircleRadius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(width - this.fireOffset, height - this.fireOffset, this.fireRadius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.strokeStyle = 'yellow';
        this.ongoingTouches.forEach(o => {
            ctx.beginPath();
            ctx.arc(o.x, o.y, 75 * this.scale, 0, 2 * Math.PI);
            ctx.stroke();
        });
    }
}