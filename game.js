class Player {
    constructor(symbol) {
        this.symbol = symbol;
        this.winner = null;
    }
}


class Board {
    constructor(size) {
        this._size = this._checkValidBoardSize(size);
        this._state = this._makeInitialState();
        this._turnCounter = 0;
        this._possibleMoves = size * size;
        this._possibleWinningMove = size * 2 - 1;
    }

    _checkValidBoardSize(size) {
        // TODO implement method
        return size;
    }

    _makeInitialState() {
        // TODO implement method
        return [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    }

    _checkValidCoordinates(row, column) {
        // TODO implement method
        return true;
    }    

    _checkForWin() {
        // TODO implement method
        return null; // returns winning player
    }

    makePlayerMove(player, row, column) {
        // TODO implement method
        console.log(row, column);
        console.log(player);
        this._state[row][column] = player.symbol;
        return true; 
    }

}


class TicTacToe {
    constructor() {
        let boardSize = prompt("Please enter a number for board size: ");
        this.board = new Board(boardSize);
        this.player1 = new Player("X");
        this.player2 = new Player("O");
        this.currentPlayer = null;
    }

    renderBoard() {
        let columnString = "| ";
        for (let row of this.board._state) {
            for (let column of row) {
                columnString += column + " | ";
            }
            console.log(columnString);
            columnString = "| ";
        }
    }

    switchPlayers() {
        if(this.currentPlayer === this.player1)
            this.currentPlayer = this.player2;
        else
            this.currentPlayer = this.player1;
    }

    getPlayerMove() {
        let move = prompt("Please enter row and column for player " + this.currentPlayer.symbol + ": ");
        console.log(move);
        console.log(this.currentPlayer.symbol);
        this.board.makePlayerMove(this.currentPlayer, move[0], move[1]);
    }

    play() {
        this.currentPlayer = this.player1;
        while (true) {
            this.renderBoard();
            this.getPlayerMove();
            this.switchPlayers();
        }
    }
}

let game = new TicTacToe;