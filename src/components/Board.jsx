import Square from './Square'
import './Board.css'

/* eslint-disable react/prop-types */
const Board = ({squares, status, onClick}) => {
  
  const renderSquare = (i) => {
    return (
      <Square 
        value={squares[i]} 
        onClick={() => onClick(i)} //onClick함수내려줌
      />
    );
  }

  return (
    <div className='board-wrapper'>
        <div className='status'>{status}</div>
        <div className='board-row' >
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className='board-row' >
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className='board-row' >
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    )
}

export default Board;