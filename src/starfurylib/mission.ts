import { GameStarFury } from "../gameStarFury.js";
import { AiSystem } from "./ai-system.js";
import { Asteroid } from "./asteroid.js";
import { Relationship } from "./friend-or-foe.js";
import { Raider, RaiderPattern } from "./raider.js";
import { Ship } from "./ship.js";
import { NpcStarfury, Starfury } from "./starfury.js";
import { Waypoint } from "./waypoint.js";
import { Word } from "./word.js";

function showMissionSuccess(id: string, game: GameStarFury) {
    let word = new Word('success', 0, 0, 50, false, 3, 'yellow');
    word.id = id;
    game.geometries.push(word);
}

function showMissionAnnouncement(title: string, subtitle: string, showWeaponsHot: boolean, id: string, game: GameStarFury) {
    let announcement = new Word(title, 0, -200, 40, true, 2, 'yellow');
    announcement.x = announcement.width / -2;
    announcement.id = id;
    game.geometries.push(announcement);

    let instructions = new Word(subtitle, -140, -220, 20, false, 2, 'green');
    game.geometries.push(instructions);

    if (showWeaponsHot) {
        let weaponsHot = new Word('weapons h o t', 0, 150, 25, false, 2, 'red');
        game.geometries.push(weaponsHot);
    }
}

export async function StartMission(game: GameStarFury) {
    let entitiesIds: string[] = [];
    let missionStage = -2;

    game.missionChecker = (game) => {
        if (game.ship.done) missionStage = -99;

        if (missionStage == -2) {
            for (let i = 0; i < 10; i++) {
                let waypoint = new Waypoint(Math.random() * 10000 - 5000, Math.random() * 10000 - 5000, 60);
                waypoint.missingEntity = true;
                waypoint.id = 'waypoint-' + i;
                entitiesIds.push(waypoint.id);
                game.geometries.push(waypoint);
                game.friendOrFoe.addRelationship(waypoint, Relationship.Waypoint);
            }
            showMissionAnnouncement('mission 01', 'fly through waypoints', false, 'mission1title', game);
            missionStage++
        } else if (missionStage == -1) {
            if (game.geometries.filter(g => g.id == 'mission1title').length == 0) {
                game.controlsEnabled = true;
                missionStage++;
            }
        } else if (missionStage == 0) {
            let stillExistsCount = game.geometries.filter(g => g.id).map(g => g.id).filter(g => entitiesIds.includes(g as string)).length;
            if (stillExistsCount == 0) {
                showMissionSuccess('mission1success', game)
                missionStage++;
            }
        } else if (missionStage == 1) {
            game.controlsEnabled = false;
            let successMessage = game.geometries.filter(g => g.id == 'mission1success');
            if (successMessage.length == 0) {
                game.stopShip();
                missionStage++;
            } else {
                successMessage[0].x = game.ship.x - (successMessage[0] as Word).width / 2;
                successMessage[0].y = game.ship.y - 100;
            }
        } else if (missionStage == 2) {
            showMissionAnnouncement('mission 02', 'destroy asteroids', true, 'mission2title', game);
            missionStage++;
        } else if (missionStage == 3) {
            if (game.geometries.filter(g => g.id == 'mission2title').length == 0) missionStage++;
        } else if (missionStage == 4) {
            game.controlsEnabled = true;
            for (let i = 0; i < 10; i++) {
                let asteroid = new Asteroid(Math.random() * 10000 - 5000, Math.random() * 10000 - 5000, Math.random() * 60 + 25, Math.random() * 2, Math.random() * 2, Math.random() * 0.25);
                asteroid.id = 'asteroid-' + i;
                entitiesIds.push(asteroid.id);
                game.friendOrFoe.addRelationship(asteroid, Relationship.Foe);
                game.geometries.push(asteroid);
            }
            missionStage++;
        } else if (missionStage == 5) {
            if (game.geometries.filter(g => g.id && entitiesIds.includes(g.id)).length == 0) missionStage++;
        } else if (missionStage == 6) {
            game.controlsEnabled = false
            showMissionSuccess('mission2success', game);
            missionStage++;
        } else if (missionStage == 7) {
            if (game.geometries.filter(g => g.id == 'mission2success').length == 0) {
                missionStage++;
                game.stopShip();
            } else {
                game.geometries.filter(g => g.id == 'mission2success').forEach(g => {
                    g.x = game.ship.x - (g as Word).width / 2 - game.ship.scale / 2;
                    g.y = game.ship.y;
                })
            }
        } else if (missionStage == 8) {
            showMissionAnnouncement('mission 03', 'destroy the raiders', true, 'mission3title', game);
            missionStage++;
        } else if (missionStage == 9) {
            if (game.geometries.filter(g => g.id == 'mission3title').length == 0) missionStage++;
        } else if (missionStage == 10) {
            for (let i = 0; i < 2; i++) {
                let raider = new Raider(Math.random() * 500 - 1000, Math.random() * 500 - 250, game.ship.scale, RaiderPattern.random);
                raider.id = 'raider-' + i;
                raider.angle = Math.random() * Math.PI;
                entitiesIds.push(raider.id);
                game.geometries.push(raider);
                game.friendOrFoe.addRelationship(raider, Relationship.Foe);
                raider.yAmount = 0;
                raider.isEnemy = true;
                raider.aiSystem = new AiSystem(raider, 'player');
                raider.faction = 'raiders';
            }
            game.controlsEnabled = true;
            missionStage++;
        } else if (missionStage == 11) {
            if (game.geometries.filter(g => g.id && entitiesIds.includes(g.id)).length == 0) {
                showMissionSuccess('mission3success', game);
                missionStage++;
            }
        } else if (missionStage == 12) {
            if (game.geometries.filter(g => g.id == 'mission3success').length == 0) missionStage++;
        } else if (missionStage == 13) {
            while(entitiesIds.length > 0) entitiesIds.pop();
            game.ship.life = 2;
            game.stopShip();
            showMissionAnnouncement('mission 04', 'the trap is sprung', true, 'mission4title', game);
            missionStage++
        } else if (missionStage == 14) {
            if (game.geometries.filter(g => g.id == 'mission4title').length == 0) missionStage++;
        } else if (missionStage == 15) {
            for (let i = 0; i < 10; i++) {
                let raider = new Raider(Math.random() * 500 - 1000, Math.random() * 1000 - 500, game.ship.scale, RaiderPattern.random);
                raider.aiSystem = new AiSystem(raider, 'player');
                raider.faction = 'raiders';
                raider.id = 'raider-' + i;
                entitiesIds.push(raider.id);
                game.geometries.push(raider);
                game.friendOrFoe.addRelationship(raider, Relationship.Foe);
            }
            let waypoint = new Waypoint(3000, 0, game.ship.scale);
            game.friendOrFoe.addRelationship(waypoint, Relationship.Waypoint);
            game.geometries.push(waypoint);
            game.controlsEnabled = true;
            missionStage++;
        } else if (missionStage == 16) {
            if (game.geometries.filter(g => g instanceof Waypoint).length == 0) {
                for (let i = 0; i < 25; i ++) {
                    let wingman = new NpcStarfury(Math.random() * 250 + 3500, Math.random() * 5000 - 500, game.ship.scale);
                    wingman.faction = 'player';
                    wingman.id = 'wingman-' + i;
                    wingman.aiSystem = new AiSystem(wingman, 'raiders');
                    game.geometries.push(wingman);
                    game.friendOrFoe.addRelationship(wingman, Relationship.Friend);
                }
                missionStage++;
            }
        } else if (missionStage == 17) {
            if (game.geometries.filter(g => g.id && entitiesIds.includes(g.id)).length == 0) {
                game.controlsEnabled = false;
                game.stopShip();
                game.geometries.filter(g => g.id && g.id.startsWith('wingman-')).forEach(g => g.done = true);
                showMissionSuccess('mission4success', game);
                missionStage = -90;
            }
        } else if (missionStage == -90) {
            game.controlsEnabled = false;
            game.stopShip();
            let word = new Word('good job', 0, -100, 40, false, undefined, 'green');
            word.x = -word.width / 2;
            game.geometries.push(word);
            let word2 = new Word('more missions coming soon', 0, 100, 25, false, undefined, 'yellow');
            word2.x = -word2.width / 2;
            game.geometries.push(word2);

            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 3; j++) {
                    game.geometries.push(new NpcStarfury(i * 50 - 100, j * 50, game.ship.scale));
                }
            }
            missionStage = -91;
        } else if (missionStage == -99) {
            game.stopShip();
            game.geometries.filter(g => g instanceof Ship).forEach(g => g.done = true);
            let word = new Word('game over', 0, -100, 40, false, undefined, 'red');
            word.x = -word.width / 2;
            game.geometries.push(word);
        }
    }
}