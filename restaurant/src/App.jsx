import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <div className='navbar'>
      </div>
      <div className='content'></div>
    </div>
  )
}

export default App
