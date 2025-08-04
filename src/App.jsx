  import {useState } from 'react'
  import './App.css'

  const Square = ({highlight, value, onSquareClick}) => {
    let style = (highlight ? 'green' : 'white')
    return (
      <button className='square' style={{backgroundColor: style}} onClick={onSquareClick}>
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
        return [a, b, c]
      }
    }
    return null;
  }

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
    let statusStyle;
    if (winner) {
      status = "Winner: " + squares[winner[0]]
      statusStyle = {border: '2px solid green'}
    } else if (!winner && squares.every(square => square != null)) {
      status = "Draw!"
      statusStyle = {border: '2px solid green'}
    } else {
      status = "Next turn: " + (isx ? "X" : "O")
      statusStyle = {border: '2px solid blue'}
    }
    return (
      <>
        <div className='status' style={statusStyle}> {status}</div>
        <div className='container'>
          <div className='row'>
            <Square highlight={(winner?.includes(0) ? true : false)} value={squares[0]} onSquareClick = {() => {handleClick(0)}}/>
            <Square highlight={(winner?.includes(1) ? true : false)} value={squares[1]} onSquareClick = {() => {handleClick(1)}}/>
            <Square highlight={(winner?.includes(2) ? true : false)} value={squares[2]} onSquareClick = {() => {handleClick(2)}}/>
          </div>
          <div className='row'>
            <Square highlight={(winner?.includes(3) ? true : false)} value={squares[3]} onSquareClick = {() => {handleClick(3)}}/>
            <Square highlight={(winner?.includes(4) ? true : false)} value={squares[4]} onSquareClick = {() => {handleClick(4)}}/>
            <Square highlight={(winner?.includes(5) ? true : false)} value={squares[5]} onSquareClick = {() => {handleClick(5)}}/>
          </div>
          <div className='row'>
            <Square highlight={(winner?.includes(6) ? true : false)} value={squares[6]} onSquareClick = {() => {handleClick(6)}}/>
            <Square highlight={(winner?.includes(7) ? true : false)} value={squares[7]} onSquareClick = {() => {handleClick(7)}}/>
            <Square highlight={(winner?.includes(8) ? true : false)} value={squares[8]} onSquareClick = {() => {handleClick(8)}}/>
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
