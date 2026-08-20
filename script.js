const gameBoard = (() => {
   let board = 
    [
        // [null, null, null],
        // [null, null, null],
        // [null, null, null]


        ["X", "O", "X"],
        ["X", "X", "X"],
        ["O", "O", "X"]
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
            return true
        }else{
            return false
            
        }

    }

    function checkIfCellEmpty(row,column){
        if (board[row][column] === null)
            return true
        else
            return false 
    }

    //Displays the board to be able to play it in console - Delete after UI implementation
    // function displayBoard(){
    //     for (let i = 0; i < board.length; i++) {
    //         let displayRow = ""
            
    //         for (let j = 0; j < board[i].length; j++) {
                
    //             if(board[i][j] === null){
    //                 displayRow += " ."
    //             }
    //             else{
    //                 displayRow += (" " + board[i][j])

    //             }
    //             displayRow += " |"
    //         }
    //         console.log(displayRow)
    //     }
        
    // }

    function returnBoardCopy(){
        // can use structuredClone as well but would like to keep for loop as I can see why and how it works.
        let boardCopy = []
        for(let i = 0; i < board.length; i++){
            boardCopy.push([])
            for (let j = 0; j < board[i].length; j++) {
                boardCopy[i][j] = board[i][j]
            }
        }
        return boardCopy
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

    return {takeUserChoice, gameWon, areAllCellsOccupied, hasGameEnded, returnBoardCopy}
})();

const gameState = (() =>{
    console.log(`Please create 2 players by using gameState.createPlayer("name", "sign"). For example gameState.createPlayer("ismail", "X")`)

    let players = []
    let activePlayer
    let isGameLocked = false

    const createPlayer = (name,sign) =>{
        players.push({name,sign})
    }

    const setActivePlayer = () =>{
        activePlayer = players[0]
    }

    const getActivePlayer = () => activePlayer

    const switchPlayer = () => {
        if(activePlayer === players[0]){
            activePlayer = players[1]
        }else{
            activePlayer = players[0]
        }
    }

    const displayBoard = () =>{
        gameBoard.displayBoard()
    }

    const startGame = () =>{
        setActivePlayer()
        console.log(`It is ${getActivePlayer().name}'s turn.`)
        displayBoard()
    }

    const playRound = (row,column) =>{
        if(isGameLocked){
            return
        }else{
            console.log(`It is ${getActivePlayer().name}'s turn.`)
            if(!gameBoard.takeUserChoice(row,column,getActivePlayer().sign)){
                console.log(`This cell is already occupied!`)
                return
            }
            else{
                console.log(
                `Player ${getActivePlayer().name} has played ${getActivePlayer().sign} into row ${row} and into column ${column}`
                )
                displayBoard()

                console.log("---------------------------------------------")

                if(gameBoard.hasGameEnded() === "winner"){
                    console.log(`The game has ended. The winner is ${getActivePlayer().name}.`)
                    isGameLocked = true
                }
                else if(gameBoard.hasGameEnded() === "tie"){
                    console.log(`The game has ended. It is a tie`)
                    isGameLocked = true
                }
                switchPlayer()
            }
        }
    }

    return {createPlayer,getActivePlayer,startGame, playRound}
})()

const handleDOM = (() =>{
    const boardElement = document.getElementById("board")
    const board = gameBoard

    let hasGameStarted = false
    
    

    function drawBoard(){
        // if(hasGameStarted){
        //     cleanBoard()
        // }
        cleanBoard()
        const boardCopy = gameBoard.returnBoardCopy()
        const boardElement = document.createElement("div")

        boardElement.setAttribute("id", "board")

        for(let i = 0; i < boardCopy.length; i++){
            for(let j = 0; j < boardCopy[i].length; j++){

                const boardCellElement = document.createElement("div");

                boardCellElement.setAttribute("class", "board-cell-div")

                boardCellElement.innerText = boardCopy[i][j]
                boardElement.append(boardCellElement)
                document.body.append(boardElement)
                
            }
        }
    }

    function cleanBoard(){
        // boardElement.innerText = ""
        document.body.innerHTML = null
    }

    function takeUserInput(){
        const cells = document.querySelectorAll(".board-cell-div")
        const activePlayer = gameState.getActivePlayer()

        for(let i = 0; i < cells.length; i++){
            let cell = cells[i]
            cell.addEventListener("click", (e) =>{
                console.log(e.target.innerText)
                console.log(i)
            })
        }

        // for (const cell of cells){
        //     if(cell.matches(".board-cell-div")){
        //         cell.addEventListener("click", (e) =>{
        //             console.log(e.target.innerText)
        //         })
        //     }
        // }
    }

    function startGame(){
        const startGameBtn = document.getElementById("start-game-button")
        
        
        startGameBtn.addEventListener("click", (e) => {
            let firstPlayerName = document.getElementById("first-player-name").value;
            let firstPlayerSign
            
            let secondPlayerName = document.getElementById("second-player-name").value;
            let secondPlayerSign
            

            const radioButtons = document.getElementsByName("sign")
            for(let i = 0; i < radioButtons.length; i++){
                if(radioButtons[i].checked){
                    // e.preventDefault()
                    firstPlayerSign = radioButtons[i].value
                }
            }

            if(firstPlayerSign === "X")
                secondPlayerSign = "O"
            else
                secondPlayerSign = "X"

            gameState.createPlayer(firstPlayerName, firstPlayerSign);
            gameState.createPlayer(secondPlayerName, secondPlayerSign)
            e.preventDefault()
            drawBoard()
            
        })

    }



    return {drawBoard, takeUserInput,cleanBoard, startGame}
})()

// handleDOM.drawBoard()
// handleDOM.takeUserInput()
handleDOM.startGame()
