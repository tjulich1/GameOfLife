// Trent Julich
// 14 Feb. 2020

class Cells {
    constructor(rows, columns, cellDimension, ctx) {
        this.rows = rows;
        this.columns = columns;
        this.ctx = ctx;
        this.cellDim = cellDimension;
        this.cells = [];
    }

    initialize() {
        for (var i = 0; i < this.rows; i++) {
            let tempArray = new Array(this.columns);
            for (var j = 0; j < this.columns; j++) {
                var placeCell = Math.random() * 2;
                if (placeCell > 1) {
                    tempArray[j] = 1;
                } else {
                    tempArray[j] = 0;
                }
            }
            this.cells[i] = tempArray;
        }
    }

    initializeWithGlider() {
        for (var i = 0; i < this.rows; i++) {
            let tempArray = new Array(this.columns);
            for (var j = 0; j < this.columns; j++) {
                tempArray[j] = 0;
            }
            this.cells[i] = tempArray;
        }
        this.cells[12][10] = 1;
        this.cells[10][11] = 1;
        this.cells[12][11] = 1;
        this.cells[11][12] = 1;
        this.cells[12][12] = 1;
    }

    update() {
        var newArray = new Array(this.rows);
        for (var rows = 0; rows < this.rows; rows++) {
            newArray[rows] = new Array(this.columns).fill(0);
        }
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                var neighbors = this.countNeighbors(j, i);
                if (this.cells[j][i] === 0) {
                    if (neighbors === 3) {
                        newArray[j][i] = 1;
                    }
                } else {
                    if (neighbors > 3) {
                        newArray[j][i] = 0;
                    } else if (neighbors < 2) {
                        newArray[j][i] = 0;
                    } else {
                        newArray[j][i] = this.cells[j][i];
                    }
                }
            }
        }
        this.cells = newArray;
    }

    countNeighbors(myX, myY) {
        var count = 0;

        var xLeft = myX - 1;
        var xRight = myX + 1;
        var yUp = myY + 1;
        var yDown = myY - 1;

        if (xLeft === -1) {
            xLeft = this.columns - 1;
        }
        if (xRight === this.columns) {
            xRight = 0;
        }
        if (yUp === this.rows) {
            yUp = 0;
        }
        if (yDown === -1) {
            yDown = this.rows - 1;
        }

        count += this.cells[xLeft][yDown];
        count += this.cells[myX][yDown];
        count += this.cells[xRight][yDown];
        count += this.cells[xLeft][myY];
        count += this.cells[xRight][myY];
        count += this.cells[xLeft][yUp];
        count += this.cells[myX][yUp];
        count += this.cells[xRight][yUp];

        return count;
    }

    draw() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                if (this.cells[j][i] === 1) {
                    this.ctx.fillRect(i * this.cellDim, j * this.cellDim, this.cellDim, this.cellDim);
                }
            }
        }
    }

}
