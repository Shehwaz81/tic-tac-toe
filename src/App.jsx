import { useState } from 'react'
import viteLogo from '/vite.svg'

const Square = () => {
  let [value, setValue] = useState(null)
  const handleClick = () => setValue('X')
  return (
    <button 
      className='square' 
      onClick={handleClick}
    >
      {value}
    </button>
  )
}

export const Board = () => {
  // we need to lift the state of value and set value up to board, so we dont have to ask every time, wiether each board is clicked or not
  let [value, setValue] = useState(Array(9).fill(null)) // creates a 9 element array of null
  return (
    <div className='container'>
      <div className='row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='row'>
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  )
}


export default Board
