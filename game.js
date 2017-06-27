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
        // In case of invalid size throw error
        return size;
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
        // TODO implement method
        // In case of invalid coords throw error
        return true;
    }    

    _checkForWin(board) {
        // checks rows
        for (let row = 0; row < board.length; row++) {
            let allCellsEqual = true;
            for (let column = 1; column < board[row].length; column++) {
                if (board[row][0] !== board[row][column]) {
                    allCellsEqual = false;
                    break;
                } 
            }  
            if (allCellsEqual && board[row][0] !== null) {
                return "Winner is " + board[row][0];
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
            if (allCellsEqual && board[0][column] !== null) {
                return "Winner is " + board[0][column];
            }
        }

        // checks diagonal from left
        for (let both = 1; both < board.length; both++) {
            let allCellsEqual = true;
            if (board[both][both] !== board[0][0]) {
                allCellsEqual = false;
                break;
            }  
            if (allCellsEqual && board[0][0] !== null) {
                return "Winner is " + board[0][0];
            }
        }

        // checks diagonal from right
        let row = board.length-1
        for (let column = 1; column < board.length; column++) {
            let allCellsEqual = true;
            if (board[board.length-1][0] !== board[row-1][column]) {
                row--;
                allCellsEqual = false;
                break;
            }   
            if (allCellsEqual && board[board.length-1][0] !== null) {
                return "Winner is " + board[board.length-1][0];
            }
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
            // TODO the last move is not printed out
            throw new Error ("Game over! It's a draw!");
        }
        return true; 
    }

}


class TicTacToe {
    constructor(askBoardSize=false) {
        let boardSize = this.getBoardSize(askBoardSize);
        this.board = new Board(boardSize);
        this.player1 = new Player("X");
        this.player2 = new Player("O");
        this.currentPlayer = null;
    }

    getBoardSize(askBoardSize) {
        let boardSize = 3;
        if (askBoardSize) {
            boardSize = prompt("Please enter a number for board size: ");
        }
        return boardSize;
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
        this.board.makePlayerMove(this.currentPlayer, move[0], move[1]);
    }

    play() {
        this.currentPlayer = this.player1;
        let gameOver = false;
        while (!gameOver) {
            this.renderBoard();
            this.getPlayerMove();
            this.switchPlayers();
        }
    }
}

let game = new TicTacToe;