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

        for (var i = 2; i < this.rows; i+=25) {
            for (var j = 2; j < this.columns; j+=20) {
                let rand = Math.random() * 12;
                if (rand < 3) {
                    this.insertGlider1(i, j);
                } else if (rand < 6 && rand > 3) {
                    this.insertGlider2(i,j);
                } else if(rand > 6 && rand < 9) {
                    this.insertGlider3(i, j);
                } else {
                    this.insertGlider4(i, j);
                }
            }
        }
    }

    insertGlider1(i, j) {
        this.cells[i+2][j] = 1;
        this.cells[i][j+1] = 1;
        this.cells[i+2][j+1] = 1;
        this.cells[i+1][j+2] = 1;
        this.cells[i+2][j+2] = 1;
    }

    insertGlider2(i, j) {
        this.cells[i][j+1] = 1;
        this.cells[i+1][j] = 1;
        this.cells[i+2][j] = 1;
        this.cells[i+2][j+1] = 1;
        this.cells[i+2][j+2] = 1;
    }

    insertGlider3(i, j) {
        this.cells[i][j] = 1;
        this.cells[i][j+1] = 1;
        this.cells[i+1][j] = 1;
        this.cells[i+1][j+2] = 1;
        this.cells[i+2][j] = 1;
    }

    insertGlider4(i, j) {
        this.cells[i][j] = 1;
        this.cells[i][j+1] = 1;
        this.cells[i][j+2] = 1;
        this.cells[i+1][j+2] = 1;
        this.cells[i+2][j+1] = 1;
    }

    initializeWithGosper() {
        for (var i = 0; i < this.rows; i++) {
            let tempArray = new Array(this.columns);
            for (var j = 0; j < this.columns; j++) {
                tempArray[j] = 0;
            }
            this.cells[i] = tempArray;
        }
        let x=5;
        let y = 5;
        this.cells[y+6][x+2]=1;
        this.cells[y+7][x+2]=1;
        this.cells[y+6][x+3]=1;
        this.cells[y+7][x+3]=1;
        this.cells[y+6][x+12]=1;
        this.cells[y+7][x+12]=1;
        this.cells[y+8][x+12]=1;
        this.cells[y+5][x+13]=1;
        this.cells[y+9][x+13]=1;
        this.cells[y+4][x+14]=1;
        this.cells[y+10][x+14]=1;
        this.cells[y+4][x+15]=1;
        this.cells[y+10][x+15]=1;
        this.cells[y+7][x+16]=1;
        this.cells[y+5][x+17]=1;
        this.cells[y+9][x+17]=1;
        this.cells[y+6][x+18]=1;
        this.cells[y+7][x+18]=1;
        this.cells[y+8][x+18]=1;
        this.cells[y+7][x+19]=1;
        this.cells[y+4][x+22]=1;
        this.cells[y+5][x+22]=1
        this.cells[y+6][x+22]=1;
        this.cells[y+4][x+23]=1;
        this.cells[y+5][x+23]=1
        this.cells[y+6][x+23]=1;
        this.cells[y+3][x+24]=1;
        this.cells[y+7][x+24]=1;
        this.cells[y+2][x+26]=1;
        this.cells[y+3][x+26]=1;
        this.cells[y+7][x+26]=1;
        this.cells[y+8][x+26]=1;
        this.cells[y+4][x+36]=1;
        this.cells[y+5][x+36]=1;
        this.cells[y+4][x+37]=1;
        this.cells[y+5][x+37]=1;

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
