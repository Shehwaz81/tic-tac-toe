  import { use, useState } from 'react'
  import './App.css'

  const Square = ({value, onSquareClick}) => {

    return (
      <button className='square' onClick={onSquareClick}>
        {value}
      </button>
    )
  }

  const is_winner = (squares) => {
    // Create arrray of arrays of all possible wining pos sets
    let win_lines = [
      // horizontal wins
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // vertical wins
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonal wins
      [0, 4, 8],
      [2, 4, 6],
    ]  
    for (let [a, b, c] of win_lines) { // must use "for...of" if there are multiple variables
      if (squares[a] != null && squares[a] == squares[b] && squares[b] == squares[c]) {
        return squares[a]
      }
    }
    return null;
  }

  // we need to lift the state of value and set value up to board, so we dont have to ask every time, wiether each board is clicked or not
  const Board = ({squares, isx, onplay}) => {

    const handleClick = (i) => {
      if (squares[i] != null || is_winner(squares)) return
      // you have to make a new copy of squares and then change it as react doesn't rerender the component if you mutate (change it directely)
      let newsquares = squares.slice()
      newsquares[i] = (isx ? "X" : "O")
      onplay(newsquares) // changing reference, causing a component rerender
    }
    const winner = is_winner(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner
    } else {
      status = "Next turn: " + (isx ? "X" : "O")
    }

    return (
      <>
        <div className='status' style={{border: `1px solid ${winner ? 'green' : 'red'}`}}> {status}</div>
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
            <Square value={squares[6]} onSquareClick = {() => {handleClick(6)}}/>
            <Square value={squares[7]} onSquareClick = {() => {handleClick(7)}}/>
            <Square value={squares[8]} onSquareClick = {() => {handleClick(8)}}/>
          </div>
        </div>
      </>
    )
  }


export const Game = () => {
    // move state to new top level function, so you can control history
    const [isx, setIsx] = useState(true)
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currMove, setCurrMove] = useState(0)
    const currSquares = history[currMove]; // get latest in history

    const handlePlay = (nextSquares) => {
      const newHistory =  [...history.slice(0, currMove + 1), nextSquares] // add a new array "nextSqaures" to history up to curr pointx
      setHistory(newHistory)
      setCurrMove(newHistory.length - 1)
      setIsx(!isx)
    }

    const Jumpto = (move) => {
      setCurrMove(move)
      setIsx(move % 2 === 0) // if the current move is even, than it is x
    }

    let historyList = history.map((squares, index) => { // element, index of element
      const descriptionOfEvent = (index === 0 ? "Game Start" : "Go to move #" + index)
      return ( // must return something, add key for react to extract
        <li key={index}> 
          <button className='history-button' onClick={() => Jumpto(index)}>{descriptionOfEvent}</button>
        </li>
      )
    })

    return (
      <>
        <h1>Tic Tac Toe</h1>
        <div className="game">
          <div className="g-board">
            <Board squares={currSquares} isx={isx} onplay={handlePlay}/>
          </div>
          <div className='info-container'>
            <div className='history'>Time Travel</div>
            <div className='g-info'>
              <ul>{historyList}</ul>
            </div>
          </div>
        </div>
      </>
    )
  }

export default Game
