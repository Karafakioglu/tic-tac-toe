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

        [null, null, "X"],
        [null, "O", null],
        ["X", null, null]
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

    //Checks if row has the same value as the first value // X X X or Y Y Y returns true or false
    // function isRowWin(){
    //     let isWin
    //     for (let i = 0; i < board.length; i++) {
    //         // const isSame = (currentValue) => currentValue === board[i][0]
    //         // isWin = isWin || board[i].every(isSame)
    //         // console.log(board[i].every(isSame))

    //         function isSame(currentValue){
    //             if(currentValue === null){
    //                 return
    //             }
    //             return currentValue === board[i][0]
    //         }
    //         isWin = isWin || board[i].every(isSame)
    //     }
    //     return isWin
    // }

    // function isRowWin(){
    //     let isWin
    //     for (let i = 0; i < board.length; i++) {
    //         let tempArr = []
    //         for(let j = 0; j< board[i].length; j++){
    //             tempArr.push(board[i][j])
    //         }
            
    //         function isSame(currentValue){
    //             if(currentValue === null){
    //                 return
    //             }
    //             return currentValue === tempArr[0]
    //         }
    //         isWin = isWin || tempArr.every(isSame)
    //     }
    //     return isWin

    // } bu gercek

    //Checks if column has the same value as the first value // XXX or YYY returns true or false.
    // function isColumnWin(){    
    //     let isWin
    //     for (let i = 0; i < board.length; i++){
    //         let tempArr = []
    //         for(let j = 0; j < board[i].length; j ++){
    //             tempArr.push(board[j][i])
    //         }
    //         // const isSame = (currentValue) => currentValue === tempArr[0]
    //         // console.log(tempArr.every(isSame))
    //         function isSame(currentValue){
    //             if(currentValue === null){
    //                 return
    //             }
    //             return currentValue === tempArr[0]
    //         }
    //         isWin = isWin || tempArr.every(isSame)
    //     }
    //     return isWin
    // }

    // function isLeftToRightDiagonalWin(){
    //     let tempArr = []
    //     for(let i = 0; i < board.length; i++){
    //         tempArr.push(board[i][i])
    //     }
    //     const isSame = (currentValue) => currentValue === tempArr[0]
    //     console.log(tempArr.every(isSame))
    // }

    // function isLeftToRightDiagonalWin(){
    //     let isWin
    //     let tempArr = []
    //     for(let i = 0; i < board.length; i++){
    //         tempArr.push(board[i][i])
    //     }
    //     // const isSame = (currentValue) => currentValue === tempArr[0]
    //     // console.log(tempArr.every(isSame))

    //     function isSame(currentValue){
    //         if(currentValue === null){
    //             return
    //         }
    //         return currentValue === tempArr[0]
    //     }
    //     isWin = isWin || tempArr.every(isSame)
    //     return isWin
    // }



    // function isRightToLeftDiagonalWin(){
    //     let tempArr = []
    //     for(let i = 0; i< board.length; i++){
    //         tempArr.push(board[i][(board.length - 1) - i])
    //     }
    //     const isSame = (currentValue) => currentValue === tempArr[0]
    //     console.log(tempArr.every(isSame))
    // }

    // function isRightToLeftDiagonalWin(){
    //     let isWin
    //     let tempArr = []
    //     for(let i = 0; i< board.length; i++){
    //         tempArr.push(board[i][(board.length - 1) - i])
    //     }
    //     const isSame = (currentValue) => currentValue === tempArr[0]
    //     console.log(tempArr.every(isSame))
    // }


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





    return {takeUserChoice, displayBoard, isRowWin, isColumnWin, isLeftToRightDiagonalWin, isRightToLeftDiagonalWin}
})();
