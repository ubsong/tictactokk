import './App.css'
import { useState } from 'react';
import Board from './components/Board'

function App() {
  //히스토리 상태
  const [history, setHistory] = useState([
    {squares: Array(9).fill(null)}
  ]) 
  //히스토리용 인덱스
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
  
  const current = history[stepNumber]; //0부터 

  //리턴값이 들어옴 ( X or O )
  const winner = calculateWinner(current.squares);

  //누를때마다... 상태가 변경됨 
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1); //배열복제 및 버림
    const newCurrent = newHistory[newHistory.length -1]; //현재의배열
    const newSquares = newCurrent.squares.slice(); // 배열복제

    //리턴값이 있거나(승자가있을때만리턴함), 클릭된게 있다면(안눌림)
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
  
  //점프한데로가고 그 뒤는 다 지워주는구나 
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0 ); //짝수면 true 로 설정
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
