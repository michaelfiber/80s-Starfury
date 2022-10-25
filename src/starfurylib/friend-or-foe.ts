import { GameStarFury } from "../gameStarFury.js";
import { Geometry, GeometryPoint } from "./geometry.js";
import { Ship } from "./ship.js";
import { Word } from "./word.js";

export enum Relationship {
    Friend,
    Foe,
    Waypoint
}

export class FriendOrFoe extends Geometry {
    targets: Array<{
        geometry: Geometry;
        word: Word;
        relationship: Relationship;
        pointer: Geometry;
    }> = [];

    constructor(public owner: Ship, x: number, y: number, scale: number) {
        super(x, y, scale);
        this.isMirrored = false;
    }

    addRelationship(geometry: Geometry, relationship: Relationship) {
        let color = relationship == Relationship.Foe ? 'red' : relationship == Relationship.Friend ? 'green' : 'blue';
        let newRel = {
            geometry,
            relationship,
            word: new Word('0', 0, 0, this.scale / 3, false, undefined, color),
            pointer: new Geometry(0, 0, this.scale)
        };
        newRel.pointer.strokeStyle = color;
        newRel.pointer.isMirrored = false;

        this.targets.push(newRel);
        this.childGeometries.push(newRel.word);
        this.childGeometries.push(newRel.pointer);
    }

    update(delta: number, game: GameStarFury) {
        super.update(delta, game);

        this.targets.forEach(t => {
            if (this.owner.adjustedHitbox && t.geometry.adjustedHitbox) {
                t.pointer.points = [];

                let angle = Math.atan2(t.geometry.adjustedHitbox.x - this.owner.x, t.geometry.adjustedHitbox.y - this.owner.y);
                let distance = Math.sqrt(Math.pow(t.geometry.adjustedHitbox.x - this.owner.x, 2) + Math.pow(t.geometry.adjustedHitbox.y - this.owner.y, 2));
                let distanceForLine = distance > 10000 ? 10000 : distance;
                t.word.word = distance.toFixed(0);

                let xComponent = Math.sin(angle);
                let yComponent = Math.cos(angle);

                t.pointer.points.push({ action: 'm', x: 0, y: 0 });
                t.pointer.points.push({
                    action: 'm',
                    x: xComponent,
                    y: yComponent
                });
                const lineScale = 1.5;

                t.pointer.points.push({
                    action: 'l',
                    x: xComponent * lineScale * (500 + distanceForLine) / 1000,
                    y: yComponent * lineScale * (500 + distanceForLine) / 1000
                });
                t.word.x = this.owner.x + xComponent * this.scale * lineScale * (500 + distanceForLine) / 1000;
                t.word.y = this.owner.y + yComponent * this.scale * lineScale * (500 + distanceForLine) / 1000;
                t.pointer.x = this.owner.x;
                t.pointer.y = this.owner.y;
            }
        })

        let done = this.targets.filter(t => t.geometry.done);
        for (let target of done) {
            this.targets.splice(this.targets.indexOf(target), 1);
            this.childGeometries.splice(this.childGeometries.indexOf(target.word), 1);
            this.childGeometries.splice(this.childGeometries.indexOf(target.pointer), 1);
        }
    }
}