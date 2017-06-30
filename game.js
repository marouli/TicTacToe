class Player {
    constructor(symbol) {
        this.symbol = symbol;
    }
}


class Board {
    constructor(size) {
        this._rangeSize = 9;
        this._size = this._checkValidBoardSize(size);
        this._state = this._makeInitialState();
        this._turnCounter = 0;
        this._possibleMoves = size * size;
        this._possibleWinningMove = (size * 2) - 1;
    }

    _checkValidBoardSize(size) {
        size = parseInt(size);

        if (isNaN(size)) {
            throw new Error (size + " not a number.");
        }
        if (size < 3 || size > this._rangeSize) {
            throw new Error (size + " is out of range. Allowed maximum size " + this._rangeSize);
        } else {
            return size;
        } 
    }

    _makeInitialState() {
        let state = [];
        for (let x = 0; x < this._size; x++) {
            let row = [];
            for (let y = 0; y < this._size; y++) {
                row.push(" ");
            }
            state.push(row);
        }
        return state;
    }

    _checkValidCoordinates(row, column) {
        row = parseInt(row);
        column = parseInt(column);

        if (isNaN(row) || isNaN(column)) {
            throw new Error ("Supplied coordinates not numbers.");
        }

        if (row < 0 || row >= this._size || column < 0 || column >= this._size) {
            throw new Error ("Coordinates out of range.");
        } 
        if (this._state[row][column] !== " ") {
            throw new Error ("Coordinates in use.");
        } else {
            return true;
        }
    }    

    _checkForWin() {
        let board = this._state;
        // checks rows
        for (let row = 0; row < board.length; row++) {
            let allCellsEqual = true;
            for (let column = 1; column < board.length; column++) {
                if (board[row][0] !== board[row][column]) {
                    allCellsEqual = false;
                    break;
                } 
            }  
            if (allCellsEqual && board[row][0] !== " ") {
                throw new Error ("Winner is " + board[row][0]);
            }
        }

        // checks columns
        for (let column = 0; column < board.length; column++) {
            let allCellsEqual = true;
            for (let row = 0; row < board.length; row++) {
                if (board[row][column] !== board[0][column]) {
                    allCellsEqual = false;
                    break;
                } 
            }  
            if (allCellsEqual && board[0][column] !== " ") {
                throw new Error ("Winner is " + board[0][column]);
            }
        }

        // checks diagonal from left
        let allCellsEqual = true;
        for (let both = 1; both < board.length; both++) {
            if (board[both][both] !== board[0][0]) {
                allCellsEqual = false;
                break;
            } 
        } 
        if (allCellsEqual && board[0][0] !== " ") {
            throw new Error ("Winner is " + board[0][0]);
        }

        // checks diagonal from right
        allCellsEqual = true;
        let row = board.length-1;
        for (let column = 1; column < board.length; column++) {
            if (board[board.length-1][0] !== board[row-1][column]) {
                allCellsEqual = false;
                break;
            } 
            row--;
        }
        if (allCellsEqual && board[board.length-1][0] !== " ") {
            throw new Error ("Winner is " + board[board.length-1][0]);
        }

    }

    makePlayerMove(player, row, column) {
        this._checkValidCoordinates(row, column);
        this._state[row][column] = player.symbol;
        this._possibleMoves--;
        this._turnCounter++;
        if (this._turnCounter >= this._possibleWinningMove) {
            this._checkForWin();
        }
        if (this._possibleMoves === 0) {
            throw new Error ("Game over! It's a draw!");
        }
        return true; 
    }

}


class TicTacToe {
    constructor(askBoardSize=false) {
        this.askBoardSize = askBoardSize;
        this.board = this._instantiateBoard(this.askBoardSize);
        this.player1 = new Player("X");
        this.player2 = new Player("O");
        this.currentPlayer = null;
    }

    _instantiateBoard(askBoardSize) {
        let boardSize = 3;
        let board = null;
        if (askBoardSize) {
            let validSize = false;
            while(!validSize) {
                try {
                    boardSize = prompt("Please enter a number for board size: ");
                    board = new Board(boardSize);
                    validSize = true;
                }
                catch(error) {
                    console.log(error.message);
                }
            }
        } else {
            board = new Board(boardSize);
        }
        return board;
    }

    _renderBoard() {
        console.clear();
        console.log("\n\n\n\n\n\n\n\n\n\n\n");
        let columnString = "| ";
        for (let row of this.board._state) {
            for (let column of row) {
                columnString += column + " | ";
            }
            console.log(columnString);
            columnString = "| ";
        }
    }

    _switchPlayers() {
        if(this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
    }

    _getPlayerMove() {
        let move = prompt("Please enter row and column for player " + this.currentPlayer.symbol + ": ");
        this.board.makePlayerMove(this.currentPlayer, move[0], move[1]);
    }

    play() {
        this.currentPlayer = this.player1;
        let gameOver = false;
        while (!gameOver) {
            this._renderBoard();

            let validMove = false;
            while (!validMove) {
                try {
                    this._getPlayerMove();
                    validMove = true;
                }
                catch (error) {
                    if (error.message === "Game over! It's a draw!" || error.message.startsWith("Winner is ")) {
                        gameOver = true;
                        this._renderBoard();
                        console.log(error.message);
                        break;
                    } else {
                        console.log(error.message);
                    }
                }
            }
            this._switchPlayers();
        }
    }

    reset() {
        this.board = this._instantiateBoard(this.askBoardSize);
        this.currentPlayer = null;
    }
}


