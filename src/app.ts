import { Game } from './game.js';
import { GameStarFury } from './gameStarFury.js';

window.addEventListener('DOMContentLoaded', () => {
    let game = new Game();

    game.gameStates.push(new GameStarFury(game));

    game.play();
});