import './Square.css'

//버튼이 재사용된다는 뜻 
// eslint-disable-next-line react/prop-types
const Square = ({onClick, value}) => {
  return (
    <button className='square'
      onClick={onClick}>  
      {value}
    </button>
  )

}                     

export default Square;