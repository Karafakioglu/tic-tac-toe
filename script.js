// oyuncu → factory, iki instance
// gameboard → IIFE, tahtayı ve tahtaya dair soruları sahipleniyor
// gameState → IIFE, sıra kimde ve oyun bitti mi


function createPlayer(name, sign){
    return {name,sign}
}

// let board = 
// [   column column column
//     [["x"],["x"],["x"]], row
//     [["o"],["o"],["o"]], row
//     [["x"],["o"],["x"]]  row
// ]

// let board = 
// [
//     [[],[],[]],
//     [[],[],[]],
//     [[],[],[]]
// ]

// function takeUserChoice(row, column, sign, playBoard){
//     playBoard[row][column] = sign
// }

const gameBoard = (() => {
   let board = 
    [
        // [null, null, null],
        // [null, null, null],
        // [null, null, null]

        ["X", "O", "X"],
        ["O", "X", "O"],
        [null, "O", "X"]
    ]

    function takeUserChoice(row, column, sign){
        if(checkIfCellEmpty(row,column)){
            board[row][column] = sign
        }else{
            console.error("This cell is already occupied");
            
        }
    }

    function checkIfCellEmpty(row,column){
        if (board[row][column] === null)
            return true
        else
            return false 
    }

    //Displays the board to be able to play it in console - Delete after UI implementation
    function displayBoard(){
        for (let i = 0; i < board.length; i++) {
            let displayRow = ""
            
            for (let j = 0; j < board[i].length; j++) {
                
                if(board[i][j] === null){
                    displayRow += " ."
                }
                else{
                    displayRow += (" " + board[i][j])

                }
                displayRow += " |"
            }
            console.log(displayRow)
        }
        
    }
    return {takeUserChoice, displayBoard}

})();

