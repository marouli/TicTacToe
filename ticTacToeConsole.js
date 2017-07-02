class Game {
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
