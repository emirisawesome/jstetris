export default class View {
    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'green',
        '6': 'purple',
        '7': 'red'
    };

    constructor(element, width, height, rows, columns){
        this.element = element;
        this.width = width;
        this.height = height;
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.playfieldBorderWidth = 4;
        this.playfieldX = this.playfieldBorderWidth;
        this.playfieldY = this.playfieldBorderWidth;
        this.playfieldWidth = this.width * 2 / 3;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

        this.boxWidth = this.playfieldInnerWidth / columns;
        this.boxHeight = this.playfieldInnerHeight / rows;

        this.panelX = this.playfieldWidth + 12;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.element.appendChild(this.canvas)
    }

    renderMainScreen(state){
        this.clearScreen();

        this.renderPlayfield(state);

        this.renderPanel(state)
    }

    clearScreen(){
        this.context.clearRect(0,0, this.width, this.height);
    }

    renderStartScreen(){
        this.context.fillStyle = '#000000';
        this.context.fillRect(0,0, this.width, this.height);
        this.context.fillStyle = '#ffffff';
        this.context.font = '18px Arial';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press Enter to start', this.width / 2, this.height / 2)

    }
    renderPauseScreen(){
        this.context.fillStyle = '#000000';
        this.context.fillRect(0,0, this.width, this.height);
        this.context.fillStyle = '#ffffff';
        this.context.font = '18px Arial';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press Enter to resume', this.width / 2, this.height / 2)

    }
    renderEndScreen({score}){
        this.clearScreen
        this.context.fillStyle = '#000000';
        this.context.fillRect(0,0, this.width, this.height);
        this.context.fillStyle = '#ffffff';
        this.context.font = '18px Arial';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 40);
        this.context.fillText(`Score ${score}`, this.width / 2, this.height / 2);
        this.context.fillText(`Press Enter to restart`, this.width / 2, this.height / 2 + 40);

    }

    renderPlayfield({ playfield }){
        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                let box = playfield[y][x];
                
                if (box) {
                    this.renderBox(this.playfieldX + (x * this.boxWidth), this.playfieldY + (y * this.boxHeight), this.boxWidth, this.boxHeight, View.colors[box])
                }
            }
        }

        this.context.strokeStyle = 'gray';
        this.context.lineWidth = this.playfieldBorderWidth;
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    }

    renderPanel({ level, score, lines, nextTetromino }){
        console.log(nextTetromino);
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'blue';
        this.context.font = '24px Arial';

        this.context.fillText(`level - ${level}`, this.panelX, this.panelY + 0);
        this.context.fillText(`score - ${score}`, this.panelX, this.panelY + 22);
        this.context.fillText(`lines - ${lines}`, this.panelX, this.panelY + 44);
        this.context.fillText(`Next - `, this.panelX, this.panelY + 66);

        for (let y = 0; y < nextTetromino.forms.length; y++) {
            for (let x = 0; x < nextTetromino.forms[y].length; x++) {
                const block = nextTetromino.forms[y][x];
                
                if (block) {
                    this.renderBox(this.panelX + (x * this.boxWidth * 0.6), this.panelY + 70 + (y * this.boxHeight * 0.6), this.boxWidth * 0.6, this.boxHeight * 0.6, View.colors[block])
                }
                
            }
            
        }
    } 

    renderBox(x, y, width, height, color){
        this.context.fillStyle = color;
        this.context.strokeStyle = 'gray';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y , width, height);
        this.context.strokeRect(x, y , width, height);
    }
}