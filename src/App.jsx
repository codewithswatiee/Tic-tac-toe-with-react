import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

// This function ensures a single source of truth and avoids redundancy
function deriveActivePlayer(gameTurns) {
  if (gameTurns.length === 0) {
    return 'X';
  }
  // If the last turn was by 'X', the next player should be 'O' and vice versa
  return gameTurns[0].player === 'X' ? 'O' : 'X';
}

// Assigns player (X or O) to the corresponding position on the gameBoard
function deriveGameBoard(gameTurns) {
  const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  // Creating deep copy for immutability
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  // Deriving state (This code won't execute if there is no turn.)
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    // console.log("Combination:", combination);
    // console.log("Symbols:", firstSquareSymbol, secondSquareSymbol, thirdSquareSymbol);

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
      break;
    }
  }
  // console.log("Game board:", gameBoard);
  // console.log("Players:", players);
  // console.log("Winner:", winner);
  return winner;
}

function App() {
  const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
  };
  const [playerNames, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  // Creating deep copy for immutability
  let gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerNames);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      // Prevent selecting a square that's already occupied
      if (gameBoard[rowIndex][colIndex]) {
        return prevTurns;
      }

      // Ensure that we update states in an immutable way and that we're not merging different states.
      const updatedTurns = [{
        square: { row: rowIndex, col: colIndex },
        player: currentPlayer
      }, ...prevTurns];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id='players' className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
