const gameBoard = (() => {
   let board = 
    [
        [null, null, null],
        [null, null, null],
        [null, null, null]


        // ["X", "O", "X"],
        // ["X", "X", "X"],
        // ["O", "O", "X"]
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

    const playRound = (row,column) =>{
        if(isGameLocked){
            return {
                status: "locked"
            }
        }else{

            if(!gameBoard.takeUserChoice(row,column,getActivePlayer().sign)){
                return {status: "occupied"}
            }
            else{


                if(gameBoard.hasGameEnded() === "winner"){
                    isGameLocked = true
                    return {
                        status: "winner", player: getActivePlayer()
                    }
                    
                }
                else if(gameBoard.hasGameEnded() === "tie"){
                    isGameLocked = true
                    return{
                        status: "tie"
                    }
                    
                }
                const currentPlayer = getActivePlayer()
                switchPlayer()
                    return {
                        status: "continue",
                        playedBy: currentPlayer,
                        nextPlayer: getActivePlayer(),
                        row,
                        column
                }
            }
        }
    }

    return {createPlayer,getActivePlayer, setActivePlayer, playRound}
})()

const handleDOM = (() =>{
    const boardElement = document.getElementById("board")
    const gameStartMenuElement = document.getElementById("game-start-menu")
    const placeholderElement = document.getElementById("placeholder")

    function drawBoard(){
        cleanBoard()
        const boardCopy = gameBoard.returnBoardCopy()


        for(let i = 0; i < boardCopy.length; i++){
            for(let j = 0; j < boardCopy[i].length; j++){

                const boardCellElement = document.createElement("div");

                boardCellElement.setAttribute("class", "board-cell-div")

                boardCellElement.innerText = boardCopy[i][j]
                boardElement.append(boardCellElement)
                
            }
        }
    }

    function cleanBoard(){
        boardElement.innerHTML = null
    }

    function takeUserInput(){
        let activePlayer = gameState.getActivePlayer()
        placeholderElement.innerText = `It is ${activePlayer.name}'s turn with sign: ${activePlayer.sign}`

        boardElement.addEventListener("click", function(event){
            let coords = findRowAndColumn(event)

            displayRoundStatus(coords.row, coords.column)
        })

    }

    function findRowAndColumn(event){
        let row
        let column
        
        let index = Array.from(boardElement.children).indexOf(event.target)
        if(Math.floor(index/3) === 0){
            row = 0
            column = index%3
        }
        else if(Math.floor(index/3) ===1){
            row = 1
            column = index%3
        }
        else{
            row = 2
            column = index%3
        }

        return {row,column}
    }

    function displayRoundStatus(row, column){
        let returnedGameState = gameState.playRound(row,column)

        if(returnedGameState.status === "continue"){
            placeholderElement.innerText = `${returnedGameState.playedBy.name} played at row: ${row}, column: ${column} with sign ${returnedGameState.playedBy.sign}. Next turn is ${returnedGameState.nextPlayer.name} with sign ${returnedGameState.nextPlayer.sign}`
        }
        else if(returnedGameState.status === "winner"){
            placeholderElement.innerText = `Game has ended. Winner is ${returnedGameState.player.name}`
        }
        else if(returnedGameState.status === "tie"){
            placeholderElement.innerText = `Game has ended with a tie!`
        }
        else if(returnedGameState.status === "occupied"){
            placeholderElement.innerText = "Illegal move! This cell is already occupied."
        }
        else if(returnedGameState.status === "locked"){
            placeholderElement.innerText = "Cannot make any other moves. Game has ended"
        }

        console.log(returnedGameState)
        drawBoard()


    }



    function startGame(){
        const startGameBtn = document.getElementById("start-game-button")
        boardElement.style.display = "none"
        
        startGameBtn.addEventListener("click", (e) => {
            boardElement.style.display = "grid"

            gameStartMenuElement.style.display = "none"

            let firstPlayerName = document.getElementById("first-player-name").value;
            let firstPlayerSign
            
            let secondPlayerName = document.getElementById("second-player-name").value;
            let secondPlayerSign
            

            const radioButtons = document.getElementsByName("sign")
            for(let i = 0; i < radioButtons.length; i++){
                if(radioButtons[i].checked){
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
            gameState.setActivePlayer()
            takeUserInput()
            
        })
    }

    return {drawBoard, takeUserInput,cleanBoard, startGame}
})()


handleDOM.startGame()
