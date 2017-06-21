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
        return true; 
    }

}


