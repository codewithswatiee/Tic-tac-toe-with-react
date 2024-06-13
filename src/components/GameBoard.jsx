import React from 'react';


const initalGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function GameBoard({ onSelectSquare, turns}) {

    let gameBoard = initalGameBoard;
    // deriving state (This code won't execute if there is no turn.)
    for (const turn of turns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;

    }

    // const [gameBoard, setGameBoard] = useState(initalGameBoard);
    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }
  return (
    <ol id='game-board'>
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                    <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
  )
}

export default GameBoard
