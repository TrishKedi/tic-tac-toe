export default function Log({turns}){
    
    return(
        
        
        <ol id="log">
            {turns.map((turn) =>
                <li key={`${turn.square.row}${turn.square.col}`}><p>{turn.player} selected {turn.square.row} ,{turn.square.col}</p></li>
            )}

        </ol>
    );

}