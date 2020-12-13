export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;

        setInterval(() => {
            this.game.moveTetrominoDown();
            this.view.renderMainScreen(this.game.state());
        }, 1000)

        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        this.view.renderStartScreen();
    }

    handleKeyDown(event) {
        switch (event.keyCode){
            case 13:
                this.view.renderMainScreen(this.game.state());
            case 37:
                this.game.moveTetrominoLeft();
                this.view.renderMainScreen(game.state());
                break;
            case 38:
                game.rotateTetromino();
                view.renderMainScreen(game.state());
                break;
            case 39:
                this.game.moveTetrominoRight();
                this.view.renderMainScreen(game.state());
                break;
            case 40:
                this.game.moveTetrominoDown();
                this.view.renderMainScreen(game.state());
                break;
        }
    }
}