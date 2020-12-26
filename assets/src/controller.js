export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.intervalID = 1;
        this.isPlaing = false;

        

        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        this.view.renderStartScreen();
    }
    update(){
        this.game.moveTetrominoDown();
        this.updateView();
    }

    play(){
        this.isPlaing = true;
        this.startTimer();
        this.updateView();
    }

    pause(){
        this.isPlaing = false;
        this.stopTimer();
        this.updateView();
    }

    updateView(){
        this.view.renderMainScreen(this.game.state());
    }

    startTimer(){
        console.log('startTimer');
        console.log(this.intervalID);
        if (this.intervalID) {
            this.intervalID = setInterval(() => {
                this.update();
            }, 1000);
        }
        
    }

    stopTimer(){
        
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    }

    handleKeyDown(event) {
        switch (event.keyCode){
            case 13:
                if (this.isPlaing) {
                    console.log("pause");
                    this.pause()
                }else {
                    this.play()
                }
                break;
            case 37:
                this.game.moveTetrominoLeft();
                this.view.renderMainScreen(this.game.state());
                break;
            case 38:
                game.rotateTetromino();
                view.renderMainScreen(this.game.state());
                break;
            case 39:
                this.game.moveTetrominoRight();
                this.view.renderMainScreen(this.game.state());
                break;
            case 40:
                this.game.moveTetrominoDown();
                this.view.renderMainScreen(this.game.state());
                break;
        }
    }
}