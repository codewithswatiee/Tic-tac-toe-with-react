import React from 'react'
import { useState } from 'react'


function Player({initialName, symbol, isActive, onChangeName}) {

    const [ isEditing, setIsEditing] = useState(false);
    const [ playerName, setPlayerName] = useState(initialName)
    function clickHandler() {
        setIsEditing((editing) => 
            !editing);
    }
    let tagContent;
    let btnCaption = 'Edit';
    if(isEditing){
        tagContent = <input type='text' required value={playerName} onChange={handleChange}/>
        btnCaption='Save';
    } else{
        tagContent = <span className='player-name'>{playerName}</span>
    }

    function handleChange(event) {
        setPlayerName(event.target.value)
    }
  return (
    <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {tagContent}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={clickHandler}>{btnCaption}</button>
    </li>
  )
}

export default Player;
