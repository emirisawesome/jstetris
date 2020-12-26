export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.intervalID = null;
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

    reset(){
        this.game.reset();
        this.isPlaing = true;
    }

    updateView(){
        let state = this.game.state();

        if (state.gameOver) {
            this.view.renderEndScreen(state)
        }else if (!this.isPlaing) {
            this.view.renderPauseScreen(state);
            
            
        }else{
            this.view.renderMainScreen(this.game.state());
        }
    }

    startTimer(){
        let speed = 1000 - this.game.state().level * 100;

        console.log('startTimer');
        console.log(this.intervalID);
        if (!this.intervalID) {
            this.intervalID = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100);
        }
        
    }

    stopTimer(){
        
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    }

    handleKeyDown(event) {
        let state = this.game.state();

        switch (event.keyCode){
            case 13:
                if (state.gameOver) {
                    this.reset();
                } else if (this.isPlaing) {
                    console.log("pause");
                    this.pause()
                } else {
                    this.play()
                }
                break;
            case 37:
                this.game.moveTetrominoLeft();
                this.updateView()
                break;
            case 38:
                game.rotateTetromino();
                this.updateView()
                break;
            case 39:
                this.game.moveTetrominoRight();
                this.updateView()
                break;
            case 40:
                this.game.moveTetrominoDown();
                this.updateView()
                break;
        }
    }
}