import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


export const Square = () => {
  return (
    <div className='container'>
      <div className='row'>
        <button className='square'>X</button>
        <button className='sqaure'>X</button>
        <button className='sqaure'>X</button>
      </div>
      <div className='row'>
        <button className='square'>X</button>
        <button className='sqaure'>X</button>
        <button className='sqaure'>X</button>
      </div>
      <div className='row'>
        <button className='square'>X</button>
        <button className='square'>X</button>
        <button className='square'>X</button>
      </div>
    </div>
  )
}


export default Square
