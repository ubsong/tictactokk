import './App.css'
import { useState } from 'react';
import Board from './components/Board'

function App() {

  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]) 
  const [stepNumber, setStepNumber] = useState(0); 
  const [xIsNext, setXIsNext] = useState(true);

  //승자계산함수
  const calculateWinner = (squares) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    
    // 0부터 7 이 되겠지~ 총 8의 길이 만큼 돌겠지 
    for (let index=0; index < lines.length; index++ ) {
      const [a,b,c] = lines[index];

      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // X or O 가 리턴됨
      }
    }
    return null;
  }
  
  const current = history[stepNumber]; //전체배열에 [0] 초기상태, current가 변경됨 
  const winner = calculateWinner(current.squares); // X or O

  //누를때마다... 상태가 변경됨 
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1); //새배열로 얕은복사 1+1=2 (2미포함)
    const newCurrent = newHistory[newHistory.length -1]; //현재의배열 2-1=1 
    const newSquares = newCurrent.squares.slice(); // 새현재배열복제

    //경기를 멈춰야하나? 승자가있을때만리턴함, 중복클릭된게 있다면(안눌림)
    if (calculateWinner(newSquares) || newSquares[i] ) {
      return;
    }

    newSquares[i] = xIsNext ? "X" : "O";
    setHistory([...newHistory, { squares: newSquares }]) 
    setXIsNext(current => !current); //상태바꿔줌

    setStepNumber(newHistory.length);
  }
   
  let status;

  if(winner) {
    status = 'Winner: '+ winner;
  } else {
    status = `Next Player : ${xIsNext ? 'X' : 'O'}`;
  }

  //<li> 버튼들 묶음이 리턴됨 => {moves} props 로 표현됨 
  const moves = history.map((step, move) => {
    const desc = move ?
    "Go to move #" + move :
    "Go to game start";
    return (
      <li key={move}>
        <button className="move-button" onClick={()=> jumpTo(move)}>{desc}</button>
      </li>
    )
  })
  
  //버튼을 누르면 과거의 그 시점의 상태로 변경시킨다 (0~8)
  const jumpTo = (step) => {
    setStepNumber(step); //stepNumber 변경됨 
    setXIsNext((step % 2) === 0 ); //짝수면 true 로 X 차례
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div> 
      <div className='game-info'>
        <div className='status'>{status}</div>
        <ol style={{listStyle:'none'}}>{moves}</ol>
      </div>

    </div>
  )
}

export default App
