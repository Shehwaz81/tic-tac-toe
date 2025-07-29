import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export const Button = () => {
  let [count, setCount] = useState(0)
  return (
    <div>
      <h1>You've clicked the button {count} times!</h1>
      <button onClick={() => setCount(count => count + 1)}>
        Hi im a button
      </button>
    </div>
  )
}

export default Button
