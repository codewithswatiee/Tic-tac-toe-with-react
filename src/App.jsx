import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import { useState } from "react";
import Log from "./components/Log";

function App() {
    const [gameTurns, setGameTurns] =  useState([]);
    const [activePlayer, setActivePlayer] = useState('X');
    
    
    function handleSelectSquare(rowIndex, colIndex) {
      setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
      setGameTurns(prevTurns => {

        let currentPlayer = 'X';
        if (prevTurns.length > 0 && prevTurns[0].player === 'X'){
          currentPlayer = 'O';
        }

        // ensures that we update states in an inmutable way and that we're not merging different states.
        const updatedTurns = [{
          square : {row: rowIndex, col: colIndex}, 
          player : currentPlayer
        }, ...prevTurns];

        return updatedTurns;
      });
    }
    return (
      <main>
        <div id="game-container">
          <ol id='players' className="highlight-player">
              <Player initialName="player-1" symbol="X" isActive= {activePlayer === 'X'}/>
              <Player initialName="player-2" symbol="O" isActive= {activePlayer === 'O'}/>
          </ol>
          <GameBoard onSelectSquare={handleSelectSquare} turns = {gameTurns}/>
        </div>
        <Log turns={gameTurns}/>
      </main>
    )
  }
  
  export default App;
  