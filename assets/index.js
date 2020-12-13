import Game from './src/game.js';
import View from './src/view.js';

const element = document.querySelector('#master');

const game = new Game();
const view = new View(element,  480, 640, 20, 10);

window.game = game;
window.view = view;

document.addEventListener('keydown', event => {
    switch (event.keyCode){
        case 37:
            game.moveTetrominoLeft();
            view.render(game.state());
            break;
        case 38:
            game.rotateTetromino();
            view.render(game.state());
            break;
        case 39:
            game.moveTetrominoRight();
            view.render(game.state());
            break;
        case 40:
            game.moveTetrominoDown();
            view.render(game.state());
            break;
    }
})
