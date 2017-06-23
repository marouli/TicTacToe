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
        return [[null, null, null], [null, null, null], [null, null, null]];
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
        this._state[row][column] = player;
        return true; 
    }

}


class TicTacToe {
    constructor() {
        boardSize = prompt("Please enter a number for board size: ");
        this.board = new Board(boardSize);
        this.player1 = new Player("X");
        this.player2 = new Player("O");
        this.currentPlayer = null;
    }

    getPlayerMove() {
        let move = prompt("Please enter row and column: ");
        this.board.makePlayerMove(this.currentPlayer, move[0], move[1]);
        this.currentPlayer = switchPlayers();
    }

    switchPlayers() {
        if(this.currentPlayer === this.player1)
            this.currentPlayer = this.player2;
        else
            this.currentPlayer = this.player1;
    }

    play() {

    }
}


