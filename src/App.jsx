import { use, useState } from 'react'
import viteLogo from '/vite.svg'

const Square = ({value, onSquareClick}) => {

  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  )
}

const is_winner = ({squares}) => {
  // make an array of arrays of all possible sets of positions that result in a win
  let win_lines = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let [a, b, c] of win_lines) {
    if (squares[a] == squares[b] && squares[b] == squares[c] && squares[a] != null) {
      return true;
    }
  }
  return false;
}

export const Board = () => {
  // we need to lift the state of value and set value up to board, so we dont have to ask every time, wiether each board is clicked or not
  let [squares, setSquares] = useState(Array(9).fill(null)) // creates a 9 element array of null
  let [isx, setIsx] = useState(true)

  const handleClick = (i) => {
    let newsquares = squares.slice() // use slice() to create a new array of "newsquares", so its not just another reference to same memory
    newsquares[i] = (isx ? "X" : "O") 
    
    setSquares(newsquares) // you are changing reference, causing a component rerender, you also cant do <sqaures = newsqaures> as that is considered mutating
    
    if (is_winner(newsquares)) console.log("winner!")
    setIsx(!isx)
  }

  return (
    <div className='container'>
      <div className='row'>
        <Square value={squares[0]} onSquareClick = {() => {handleClick(0)}}/>
        <Square value={squares[1]} onSquareClick = {() => {handleClick(1)}}/>
        <Square value={squares[2]} onSquareClick = {() => {handleClick(2)}}/>
      </div>
      <div className='row'>
        <Square value={squares[3]} onSquareClick = {() => {handleClick(3)}}/>
        <Square value={squares[4]} onSquareClick = {() => {handleClick(4)}}/>
        <Square value={squares[5]} onSquareClick = {() => { handleClick(5)}}/>
      </div>
      <div className='row'>
        <Square value={squares[6]} onSquareClick = {() => {handleClick(6)}} />
        <Square value={squares[7]} onSquareClick = {() => {handleClick(7)}} />
        <Square value={squares[8]} onSquareClick = {() => {handleClick(8)}} />
      </div>
    </div>
  )
}


export default Board
