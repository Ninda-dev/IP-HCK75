import { useState } from 'react'
import { DeclaredRouter } from './router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DeclaredRouter/>
    </>
  )
}

export default App
