export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playfield = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    activeTetromino = {
        x: 5,
        y: 0,
        get tetromino(){
            return this.rotations[this.rotationIndex];
        },
        rotationIndex: 0,
        rotations: [
            [
                [0,1,0],
                [1,1,1],
                [0,1,0]
            ],
            [
                [0,1,0],
                [0,1,1],
                [0,1,0]
            ],
            [
                [0,0,0],
                [1,1,1],
                [0,1,0]
            ],
            [
                [0,1,0],
                [1,1,0],
                [0,1,0]
            ],
        ],
    };

    moveTetrominoLeft() {
        this.activeTetromino.x -= 1;

        if (this.collision()) {
            this.activeTetromino.x += 1;
        }
    }

    moveTetrominoRight() {
        this.activeTetromino.x += 1;

        if (this.collision()) {
            this.activeTetromino.x -= 1;
        }
    }
    
    moveTetrominoDown() {
        this.activeTetromino.y += 1;
        
        if (this.collision()) {
            this.activeTetromino.y -= 1;
            this.pasteTetromino();
        }
    }
    rotateTetromino(){
        this.activeTetromino.rotationIndex = (this.activeTetromino.rotationIndex + 1) % 4;

        if (this.collision()) {
            this.activeTetromino.rotationIndex = (this.activeTetromino.rotationIndex - 1) % 4;
        }
        return this.activeTetromino.tetromino;
    }
    collision() {
        const { y: tetrominoY, x: tetrominoX, tetromino} = this.activeTetromino;
        const playfield = this.playfield;

        for (let y = 0; y < tetromino.length; y++) {
            for (let x = 0; x < tetromino[y].length; x++) {
                if (tetromino[y][x] !== 0 && ((playfield[tetrominoY + y] === undefined || playfield[tetrominoY + y][tetrominoX + x] === undefined) || playfield[tetrominoY + y][tetrominoX + x])) {
                    return true;
                }
            }
            
        }

        return false;
    }

    pasteTetromino() {
        const { y: tetrominoY, x: tetrominoX, tetromino} = this.activeTetromino;

        for (let y = 0; y < tetromino.length; y++) {
            for (let x = 0; x < tetromino[y].length; x++) {
                if (tetromino[y][x] !== 0) {
                    this.playfield[tetrominoY + y][tetrominoX + x] = tetromino[y][x];
                }
            }
            
        }
    }
}