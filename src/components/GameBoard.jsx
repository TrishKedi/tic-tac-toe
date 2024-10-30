import { useState } from "react";

export default function GameBoard({onSelected, currPlayer, board}){
    // const [gameBoard, setSeletedSquare] = useState(initialGameBoard);
    
    function handleSelectSquare(rowIndex, colIndex){
        
        onSelected(rowIndex, colIndex);

    } 

    

    
    return <ol id="game-board">
        {board.map((playerRow, rowIndex) => (
            
            <li key={rowIndex}>
                <ol>
                
                {playerRow.map((playerSymbol, colIndex) => (
                    <li key={colIndex}><button onClick={() => handleSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button></li>
                ))}
                </ol>
            </li>
        ))} 

    </ol>
}