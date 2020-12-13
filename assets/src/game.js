export default class Game {
    static points = {
        '1': 40,
        '2': 100,
        '3': 300,
        '4': 1200,
    }

    score = 0;
    lines = 19;
    playfield = this.generatePlayfield();

    activeTetromino = this.generateTetromino();
    nextTetromino = this.generateTetromino();

    get level() {
        return Math.floor(this.lines * 0.1);
    }

    state(){

        const playfield = this.generatePlayfield();
        let {y: formY, x: formX, forms} = this.activeTetromino;

        for (let y = 0; y < this.playfield.length; y++) {
            playfield[y] = [];
 
            for (let x = 0; x < this.playfield[y].length; x++) {
                 playfield[y][x] = this.playfield[y][x];
            }
            
        }

        for (let y = 0; y < forms.length; y++) {
            for (let x = 0; x < forms[y].length; x++) {
                if (forms[y][x]) {
                    playfield[formY + y][formX + x] = forms[y][x];
                }
                
            }
            
        }
        
        return {
            // playfield: Object.assign(this.activeTetromino.forms)
            level: this.level,
            score: this.score,
            lines: this.lines,
            nextTetromino: this.nextTetromino,
            playfield
        }
    }
    generatePlayfield(){
       const playfield = [];

       for (let y = 0; y < 20; y++) {
           playfield[y] = [];

           for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0;
           }
           
       }

       return playfield;
    }

    generateTetromino(){
        let index = Math.floor(Math.random() * 7);
        const type = 'IJLOSTZ'[index];
        const piece = {x: 0, y: 0,}

        switch (type) {
            case 'I':
                piece.forms = [
                    [0,0,0,0],
                    [1,1,1,1],
                    [0,0,0,0],
                    [0,0,0,0],
                ];
                break;
            case 'J':
                piece.forms = [
                    [0,0,0],
                    [2,2,2],
                    [0,0,2],
                ];
                break;
            case 'L':
                piece.forms = [
                    [0,0,0],
                    [3,3,3],
                    [3,0,0],
                ]
                break;
            case 'O':
                piece.forms = [
                    [0,0,0,0],
                    [0,4,4,0],
                    [0,4,4,0],
                    [0,0,0,0],
                ];
                break;
            case 'S':
                piece.forms = [
                    [0,0,0],
                    [0,5,5],
                    [5,5,0],
                ]
                break;
            case 'T':
                piece.forms = [
                    [0,0,0],
                    [6,6,6],
                    [0,6,0],
                ]
                break;
            case 'Z':
                piece.forms = [
                    [0,0,0],
                    [7,7,0],
                    [0,7,7],
                ]
                break;
            default: console.log('switch type err');
        }
        
        piece.x = Math.floor((10 - piece.forms[0].length) / 2);
        piece.y = -1;

        return piece;
    }
    
    moveTetrominoLeft(){
        this.activeTetromino.x -= 1;

        if (this.collision()) {
            this.activeTetromino.x += 1;
        }
    }

    moveTetrominoRight(){
        this.activeTetromino.x += 1;

        if (this.collision()) {
            this.activeTetromino.x -= 1;
        }
    }

    moveTetrominoDown(){
        this.activeTetromino.y += 1;

        if (this.collision()) {
            this.activeTetromino.y -= 1;
            this.pasteTetro();
            const clearedLines = this.clearLines();
            this.updateScore(clearedLines)
            this.updateTetromino()
        }
    }

    rotateTetromino(){
        const forms = this.activeTetromino.forms;
        const length = forms.length;

        let cache = [];
        for (let i = 0; i < length; i++) {
            cache[i] = new Array(length).fill(0)
            
        }

        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                cache[x][y] = forms[length - 1 - y][x];
                
            }
            
        }
        console.log(cache);
        this.activeTetromino.forms = cache;

        if (this.collision()) {
            this.activeTetromino.forms = forms;
        }
    }

    collision(){
        let {y: formY, x: formX, forms} = this.activeTetromino;
        let playfield = this.playfield;

        for (let y = 0; y < forms.length; y++) {
            for (let x = 0; x < forms[y].length; x++) {

                if (forms[y][x] !== 0 && 
                    ((playfield[formY + y] === undefined || playfield[formY + y][formX + x] === undefined) ||
                    this.playfield[formY + y][formX + x])
                    ) {
                    return true;
                }

            }
            
        }
        return false;
    }

    // #################################################################################################################################

    pasteTetro(){
        let {y: formY, x: formX, forms} = this.activeTetromino;
        
        for (let y = 0; y < forms.length; y++) {
            for (let x = 0; x < forms[y].length; x++) {

                if (forms[y][x]) {
                    this.playfield[formY + y][formX + x] = forms[y][x];
                }
                
            }
            
        }
    }

    clearLines(){
        let rows = 20;
        let columns = 10;
        let lines = [];

        for (let y = rows - 1; y >= 0; y--) {
            let quantityBlocks = 0

            for (let x = 0; x < columns; x++) {
                if (this.playfield[y][x] !== 0) {
                    quantityBlocks += 1;

                }
                
            }
            
            if (quantityBlocks == 0) {
                break;
            } else if (quantityBlocks < columns) {
                continue;
            } else if (quantityBlocks === columns) {
                lines.unshift(y);
            }
        }

        for (const index of lines) {
            this.playfield.splice(index, 1);
            this.playfield.unshift(new Array(columns).fill(0))
        }

        return lines.length;
    }

    updateScore(clearedLines){
        if (clearedLines > 0) {
            this.score += Game.points[clearedLines] * (this.level + 1);
            this.lines += clearedLines;
        }
    }

    updateTetromino(){
        this.activeTetromino = this.nextTetromino;
        this.nextTetromino = this.generateTetromino();
    }
}