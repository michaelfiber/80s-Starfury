import { Geometry } from "./starfurylib/geometry.js";
import { Button } from "./button.js";
import { Game, GameEvent, GameRect } from "./game.js";
import { GameState } from "./gameState.js";
import { Grid } from "./starfurylib/grid.js";
import { Ship } from "./starfurylib/ship.js";
import { Bullet } from "./starfurylib/bullet.js";
import { isColliding } from "./util.js";
import { Word } from "./starfurylib/word.js";
import { Starfield } from "./starfurylib/starfield.js";
import { FriendOrFoe, Relationship } from "./starfurylib/friend-or-foe.js";
import { StartMission } from "./starfurylib/mission.js";
import { Starfury } from "./starfurylib/starfury.js";
import { OnScreenControls } from "./starfurylib/on-screen-controls.js";
import { VelocityIndicator } from "./starfurylib/velocity-indicator.js";

export class GameStarFury extends GameState {
    buttons: Button[] = [];

    missionChecker?: (game: GameStarFury) => void;

    left = false;
    right = false;
    up = false;
    down = false;
    fire = false;

    controlsEnabled = false;

    camera: { x: number; y: number } = { x: 0, y: 0 };
    isMobile = false;
    zoom = 0.5;
    targetZoom = 0.5;

    get overallScale() {
        return (this.isMobile ? 1 : 2) * this.zoom;
    }

    ship: Ship;
    grid: Grid;
    title: Word;
    speedo: Word;
    friendOrFoe: FriendOrFoe;

    isFiring = false;
    shotCooldown = 1;
    currentShotCooldown = 0;

    //bullets: Bullet[] = [];
    geometries: Geometry[] = [];

    controlsDiv: HTMLDivElement = document.createElement('div');

    onScreenControls: OnScreenControls;

    makeHtmlControls() {

        this.controlsDiv.classList.add('controls');

        this.controlsDiv.style.position = 'fixed';
        this.controlsDiv.style.bottom = '0';
        this.controlsDiv.style.left = '0';
        this.controlsDiv.style.right = '0';
        this.controlsDiv.style.zIndex = '99999';
        this.controlsDiv.style.font = '64px sans-serif';
        this.controlsDiv.style.display = 'flex';
        this.controlsDiv.style.flexDirection = 'row';
        this.controlsDiv.style.justifyContent = 'space-between';

        document.body.appendChild(this.controlsDiv);

        let left = document.createElement('button');
        left.innerHTML = '&larr;';
        left.style.width = '15vw';
        left.style.height = '7vw';
        left.style.fontSize = '16px';
        left.style.userSelect = 'none';

        left.addEventListener('touchstart', (ev) => {
            this.left = true;
            ev.preventDefault();
        });
        left.addEventListener('mousedown', (ev) => {
            this.left = true;
            ev.preventDefault();
        });

        left.addEventListener('touchend', (ev) => {
            this.left = false;
            ev.preventDefault();
        });
        left.addEventListener('mouseup', (ev) => {
            this.left = false;
            ev.preventDefault();
        });

        let right = document.createElement('button');
        right.innerHTML = '&rarr;';
        right.style.width = '15vw';
        right.style.height = '7vw';
        right.style.fontSize = '16px';
        right.style.userSelect = 'none';

        right.addEventListener('touchstart', (ev) => {
            this.right = true;
            ev.preventDefault();
        });
        right.addEventListener('mousedown', (ev) => {
            this.right = true;
            ev.preventDefault();
        });

        right.addEventListener('touchend', (ev) => {
            this.right = false;
            ev.preventDefault();
        });
        right.addEventListener('mouseup', (ev) => {
            this.right = false;
            ev.preventDefault();
        });

        let thrust = document.createElement('button');
        thrust.innerHTML = '&#8593;';
        thrust.style.width = '15vw';
        thrust.style.height = '7vw';
        thrust.style.fontSize = '16px';
        thrust.style.userSelect = 'none';

        thrust.addEventListener('touchstart', (ev) => {
            this.up = true;
            ev.preventDefault();
        });
        thrust.addEventListener('mousedown', (ev) => {
            this.up = true;
            ev.preventDefault();
        });
        thrust.addEventListener('touchend', (ev) => {
            this.up = false;
            ev.preventDefault();
        });
        thrust.addEventListener('mouseup', (ev) => {
            this.up = false;
            ev.preventDefault();
        });

        let fire = document.createElement('button');
        fire.innerHTML = 'FIRE!';
        fire.style.width = '15vw';
        fire.style.height = '7vw';
        fire.style.fontSize = '16px';
        fire.style.userSelect = 'none';
        fire.style.marginLeft = 'auto';
        fire.addEventListener('touchstart', (ev) => {
            this.fire = true;
            ev.preventDefault();
        });
        fire.addEventListener('mousedown', (ev) => {
            this.fire = true;
            ev.preventDefault();
        });
        fire.addEventListener('touchend', (ev) => {
            this.fire = false;
            ev.preventDefault();
        });
        fire.addEventListener('mouseup', (ev) => {
            this.fire = false;
            ev.preventDefault();
        });


        this.controlsDiv.appendChild(left);
        this.controlsDiv.appendChild(right);

        this.controlsDiv.appendChild(fire);
        this.controlsDiv.appendChild(thrust);
    }

    stopShip() {
        this.ship.x = 0;
        this.ship.y = 0;
        this.ship.angle = 0;
        this.ship.aVel = 0;
        this.ship.xVel = 0;
        this.ship.yVel = 0;
        this.controlsEnabled = false;
        this.ship.isRotRightOn = false;
        this.ship.isRotLeftOn = false;
        this.ship.isForwardOn = false;
        this.ship.isBackOn = false;
        this.ship.xAmount = 0;
        this.ship.yAmount = 0;
    }

    constructor(public game: Game) {
        super('starfury', game);

        this.onScreenControls = new OnScreenControls(game.canvas);

        this._checkMobile();

        /*
        if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
            this.makeHtmlControls();
            this.isMobile = true;
        }
        */

        this.geometries.push(new Starfield(500000));

        this.grid = new Grid(10, 10, game.ctx, 0, 0, 10000);
        this.grid.parallax = 0.25;
        this.geometries.push(this.grid);

        this.ship = new Starfury(0, 0, 40);
        this.ship.faction = 'player';
        this.ship.id = 'player';
        this.geometries.push(this.ship);

        let velIndicator = new VelocityIndicator(this.ship);
        this.geometries.push(velIndicator);

        this.title = new Word('star fury', 0, 0, 50, false, 2, '#ffaaff');
        this.geometries.push(this.title);

        this.speedo = new Word('00', 0, 0, 25);
        this.geometries.push(this.speedo);

        this.friendOrFoe = new FriendOrFoe(this.ship, 0, 0, this.ship.scale);
        this.geometries.push(this.friendOrFoe);

        setTimeout(() => {
            StartMission(this);
        }, 2000);

    }

    private _updateInput(events: GameEvent[]) {
        Button.CheckEvents(events, this.buttons);

        if (this.controlsEnabled) {
            if (this.isMobile) this.onScreenControls.update(this.game.width, this.game.height);

            this.ship.xAmount = this.onScreenControls.xAxis;
            this.ship.yAmount = this.onScreenControls.yAxis;

            for (let event of events) {
                if ((event.type == 'keydown' || event.type == 'keyup') && event.key) {
                    switch (event.key) {
                        case 'Escape':
                            this.done = event.type == 'keydown';
                            break;
                        case 'a':
                        case 'ArrowLeft':
                            this.left = event.type == 'keydown';
                            break;
                        case 's':
                        case 'ArrowDown':
                            this.down = event.type == 'keydown';
                            break;
                        case 'w':
                        case 'ArrowUp':
                            this.up = event.type == 'keydown';
                            break;
                        case 'd':
                        case 'ArrowRight':
                            this.right = event.type == 'keydown';
                            break;
                        case ' ':
                            //if (event.type == 'keydown') this.isFiring = !this.isFiring;
                            this.fire = event.type == 'keydown';
                            break;
                    }
                }
            }

            if (this.left) this.ship.xAmount = -1;
            else if (this.right) this.ship.xAmount = 1;
            if (this.up) this.ship.yAmount = 1;
            else if (this.down) this.ship.yAmount = -1;

            if (this.isMobile) this.fire = this.onScreenControls.isFiring;
        }
    }

    private _updateShip(delta: number) {
        if (this.controlsEnabled && (this.isFiring || this.fire) && this.currentShotCooldown == 0) {
            this.geometries.push(new Bullet(this.ship, this.ship.x + (10 * Math.cos(this.ship.angle - Math.PI / 4)), this.ship.y + (10 * Math.sin(this.ship.angle - Math.PI / 4)), this.ship.scale, this.ship.angle, 30, this.game.ctx));
            this.geometries.push(new Bullet(this.ship, this.ship.x + (10 * Math.cos(this.ship.angle + Math.PI)), this.ship.y + (10 * Math.sin(this.ship.angle + Math.PI)), this.ship.scale, this.ship.angle, 30, this.game.ctx));
            this.currentShotCooldown = this.shotCooldown;
        }


        if (this.controlsEnabled && (this.isFiring || this.fire)) this.ship.isFiring = true;
        else this.ship.isFiring = false;

        if (this.controlsEnabled) {
            this.ship.isForwardOn = this.up;
            this.ship.isBackOn = this.down;
            this.ship.isRotLeftOn = this.left;
            this.ship.isRotRightOn = this.right;
        }
    }

    _checkMobile() {
        if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
            this.isMobile = true;
        }
    }

    update(time: number, delta: number, events: GameEvent[]) {
        this._updateInput(events);
        this._updateShip(delta);

        if (this.done) {
            document.body.removeChild(this.controlsDiv);
            return;
        }

        this.geometries.forEach(g => g.update(delta, this));

        for (let g of this.geometries) {
            if (g.done) this.geometries.splice(this.geometries.indexOf(g), 1);
        }

        this.camera.x = this.ship.x;
        this.camera.y = this.ship.y;

        if (!this.title.done) {
            this.title.x = this.ship.x - this.title.width / 2, this.title.y = this.ship.y - 100 * this.overallScale;
        }

        // check for bullet hits.
        this.geometries.filter(g => g.adjustedHitbox && g instanceof Bullet).forEach(bullet => {
            this.geometries.filter(g => g.adjustedHitbox && g.isShootable).forEach(shootable => {
                if (shootable.adjustedHitbox && bullet.adjustedHitbox && isColliding(bullet.adjustedHitbox, shootable.adjustedHitbox)) {
                    (bullet as Bullet).hit(shootable);
                }
            });
            // if (this.wingman.adjustedHitbox && bullet.adjustedHitbox && isColliding(bullet.adjustedHitbox, this.wingman.adjustedHitbox)) {
            //     (bullet as Bullet).hit(this.wingman);
            // }
        });

        this.speedo.word = (this.ship.vel).toFixed(0);
        this.speedo.x = this.ship.x;
        this.speedo.y = this.ship.y + this.game.height / 8;

        this.friendOrFoe.x = this.ship.x;
        this.friendOrFoe.y = this.ship.y;

        if (this.missionChecker) this.missionChecker(this);

        this.targetZoom = 0.5 - 0.25 * (this.ship.vel / 30);

        if (Math.abs(this.zoom - this.targetZoom) < 0.1) this.zoom = this.targetZoom;
        if (this.zoom < this.targetZoom) this.zoom += 0.05;
        else if (this.zoom > this.targetZoom) this.zoom -= 0.05;
    }

    draw() {
        let ctx = this.game.ctx;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.game.width, this.game.height);

        this.geometries.filter(g => g.isVisible).forEach(g => g.draw(ctx, this.game.width, this.game.height, this.camera, this.overallScale));

        this.buttons.forEach(b => b.draw(this.game.ctx));

        if (this.isMobile) this.onScreenControls.draw(ctx, this.game.width, this.game.height);
    }
}