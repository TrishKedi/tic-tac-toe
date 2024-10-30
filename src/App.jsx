import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log.jsx"
import {WINNING_COMBINATIONS} from "./winning-combinations.js"
import GameOver from "./components/GameOver.jsx"
const initialGameBoard = [
  [null, null, null ],
  [null, null, null],
  [null, null, null]
];
function App() {

  const[activePlayer, setActivePlayer] = useState('X')
  const[players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player2'
  })
  const[gameTurns, setGameTurns] = useState([])

  let winner = null
  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])]
  // let gameBoard = initialGameBoard;
  for (const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;

}

for( const combination of WINNING_COMBINATIONS){
  // console.log(combination)
  // console.log(gameBoard)
  const firstSymbol = gameBoard[combination[0].row][combination[0].column]
  const secSymbol = gameBoard[combination[1].row][combination[1].column]
  const thirdSymbol = gameBoard[combination[2].row][combination[2].column]

  // console.log(firstSymbol)
  // console.log(secSymbol)
  // console.log(thirdSymbol)

  if(firstSymbol &&
    firstSymbol === secSymbol &&
    firstSymbol === thirdSymbol
  ){
    winner = players[firstSymbol]
  }

}

const hasDraw = gameTurns.length == 9 && !winner

  function onSelected(rowIndex, colIndex){ 
   setActivePlayer((currentPlayer)=> currentPlayer === 'X' ? 'O': 'X' )
   setGameTurns((prevTurns) => {
      let currntPlayer = 'X'

      if (prevTurns.length > 0 && prevTurns[0].player === 'X'){
          currntPlayer = 'O'
      }

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currntPlayer}, ...prevTurns]
      return updatedTurns
      })
   
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerName(symbol, newName){
    setPlayers(prevPlayeys => {
      return{
        ...prevPlayeys,
        [symbol]: newName
      }
    })
  }


  return (
  
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName='Player 1' symbol='X' isActive={activePlayer == 'X'} onChangeName={handlePlayerName}/>
          <Player initialName='Player 2' symbol='O' isActive={activePlayer == 'O'} onChangeName={handlePlayerName}/>
        </ol>
        { (winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard  onSelected={onSelected} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
