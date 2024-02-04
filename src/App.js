import './App.css';
import Box from './comp/Box';
import { useState } from 'react';

export default function App() {
  const [state, setState] = useState(Array(9).fill(""));
  const [prev, setPrev] = useState("O");
  const [clickedBlocks, setClickedBlocks] = useState(new Set());
  const [win, setWin] = useState(false);
  const [player,setPlayer] = useState(1);
  const [tie,setTie] = useState(false);


  
  


  const handleStateChange = async (number) => {
    if (clickedBlocks.has(number) || state[number] !== "" || win === true) {
      return;
    }
  
    const newState = [...state];
    newState[number] = prev === "X" ? "O" : "X";
  
    setPrev((prev) => (prev === "X" ? "O" : "X"));
    await setState(newState);
  
    setClickedBlocks((prevClickedBlocks) => new Set([...prevClickedBlocks, number]));
  
    console.log(Win(newState));
    if (Win(newState)) {
      setWin(true);
    } else {
      setPlayer((player) => {
        return player === 1 ? 2 : 1;
      });
    }
  };

  function Win(cstate) {
    for (let i = 0; i < 9; i += 3) {
      if (cstate[i] !== "" && cstate[i] === cstate[i + 1] && cstate[i + 1] === cstate[i + 2]) {
        return true;
      }
    }
  
    for (let i = 0; i < 3; i++) {
      if (cstate[i] !== "" && cstate[i] === cstate[i + 3] && cstate[i + 3] === cstate[i + 6]) {
        return true;
      }
    }
  
    if (cstate[0] !== "" && cstate[0] === cstate[4] && cstate[4] === cstate[8]) {
      return true;
    }
    if (cstate[2] !== "" && cstate[2] === cstate[4] && cstate[4] === cstate[6]) {
      return true;
    }
    let cnt = 0;
    for(let i = 0; i<9; i++)
    {
      cnt += (cstate[i]!=="");
    }
    if(cnt === 9)
    {
        setTie(true);
    }
    return false;
  }
  

  function restart(){
    setState(Array(9).fill(""));
    setPrev("O");
    setClickedBlocks(new Set());
    setWin(false);
    setPlayer(1);
    setTie(false);
  }
  return (
    <>
    <div>
        {win && <div className='winner'>Player {player} has Won !!</div>}
        {tie && <div className='tie'>Looks like its a tie!!</div>}
    </div>
      <div className='board'>
      <div className='row'>
        <Box onClick={() => handleStateChange(0)} value={state[0]}></Box>
        <Box onClick={() => handleStateChange(1)} value={state[1]}></Box>
        <Box onClick={() => handleStateChange(2)} value={state[2]}></Box>
      </div>
      <div className='row'>
        <Box onClick={() => handleStateChange(3)} value={state[3]}></Box>
        <Box onClick={() => handleStateChange(4)} value={state[4]}></Box>
        <Box onClick={() => handleStateChange(5)} value={state[5]}></Box>
      </div>
      <div className='row'>
        <Box onClick={() => handleStateChange(6)} value={state[6]}></Box>
        <Box onClick={() => handleStateChange(7)} value={state[7]}></Box>
        <Box onClick={() => handleStateChange(8)} value={state[8]}></Box>
      </div>
      </div>
      {(win || tie) && <button onClick={restart}> Rematch ?? </button>}
    </>
    
    
  );
}
