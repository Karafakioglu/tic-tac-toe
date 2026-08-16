// oyuncu → factory, iki instance
// gameboard → IIFE, tahtayı ve tahtaya dair soruları sahipleniyor
// gameState → IIFE, sıra kimde ve oyun bitti mi


function createPlayer(name, sign){
    return {name,sign}
}

const gameBoard = (() => {
   let board = 
    [
        // [null, null, null],
        // [null, null, null],
        // [null, null, null]

        ["X", null, null],
        [null, "O", null],
        [null, null, null]
    ]

    function hasGameEnded(){
        if(areAllCellsOccupied() && gameWon()){
            return "winner"
        }
        else if(areAllCellsOccupied() && !gameWon()){
            return "tie"
        }else if(!areAllCellsOccupied() && gameWon()){
            return "winner"
        }
        else{
            return
        }
    }

    function areAllCellsOccupied(){
        let flatArr = board.flat()
        const hasOorX = (sign) => sign === "X" || sign === "O"
        return flatArr.every(hasOorX)
    }

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

    function gameWon(){
        return isRowWin() || isColumnWin() || isLeftToRightDiagonalWin() || isRightToLeftDiagonalWin()
    }

    function hasWon (tempArr){
        function isSame(currentValue){
            if(currentValue === null)
                return
            return currentValue === tempArr[0]
        }
        return tempArr.every(isSame)
    }

    function isRowWin(){
        let isWin
        for (let i = 0; i < board.length; i++) {
            let tempArr = []
            for(let j = 0; j< board[i].length; j++){
                tempArr.push(board[i][j])
            }
            
            isWin = isWin || hasWon(tempArr)
        }
        return isWin

    }

    function isColumnWin(){    
        let isWin
        for (let i = 0; i < board.length; i++){
            let tempArr = []
            for(let j = 0; j < board[i].length; j ++){
                tempArr.push(board[j][i])
            }
            isWin = isWin || hasWon(tempArr)
        }
        return isWin
    }

    function isLeftToRightDiagonalWin(){
        let isWin
        let tempArr = []
        for(let i = 0; i < board.length; i++){
            tempArr.push(board[i][i])
        }

        isWin = isWin || hasWon(tempArr)
        return isWin
    }

    function isRightToLeftDiagonalWin(){
        let isWin
        let tempArr = []
        for(let i = 0; i< board.length; i++){
            tempArr.push(board[i][(board.length - 1) - i])
        }
        isWin = isWin || hasWon(tempArr)
        return isWin
    }

    return {takeUserChoice, displayBoard, gameWon, areAllCellsOccupied, hasGameEnded}
})();


const gameState = (() =>{

})()