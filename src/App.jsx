import { use, useState } from 'react'
import viteLogo from '/vite.svg'

const Square = ({value, onSqaureClick}) => {

  return (
    <button className='square' onClick={onSqaureClick}>
      {value}
    </button>
  )
}

export const Board = () => {
  // we need to lift the state of value and set value up to board, so we dont have to ask every time, wiether each board is clicked or not
  let [squares, setSquares] = useState(Array(9).fill(null)) // creates a 9 element array of null
  // now we can pass in the expected value of each square via props!
  let [isx, setIsx] = useState(true)
  const handleClick = (i) => {
    // apparently you have to make a new copy of squares and then change it as react doesn't rerender the component if you mutate (change it directely)
    let newsquares = squares
    newsquares[i] = (is_x ? "X" : "O") 
    setSquares(newsquares) // you are changing reference, causing a component rerender
    console.log(squares[i])
    setIsx()
  }
  return (
    <div className='container'>
      <div className='row'>
        <Square value={squares[0]} onSqaureClick = {() => {handleClick(0)}}/>
        <Square value={squares[1]} onSqaureClick = {() => {handleClick(1)}}/>
        <Square value={squares[2]} onSqaureClick = {() => {handleClick(2)}}/>
      </div>
      <div className='row'>
        <Square value={squares[3]} onSqaureClick = {() => {handleClick(3)}}/>
        <Square value={squares[4]} onSqaureClick = {() => {handleClick(4)}}/>
        <Square value={squares[5]} onSqaureClick = {() => { handleClick(5)}}/>
      </div>
      <div className='row'>
        <Square value={squares[6]} onSqaureClick = {() => {handleClick(6)}}/>
        <Square value={squares[7]} onSqaureClick = {() => {handleClick(7)}}/>
        <Square value={squares[8]} onSqaureClick = {() => {handleClick(8)}}/>
      </div>
    </div>
  )
}


export default Board
