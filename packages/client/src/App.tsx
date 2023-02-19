import { FC } from 'react'
import { Board } from './components/board'

const App: FC = () => {
  return (
    <div className="h-screen bg-slate-800">
      <Board />
    </div>
  )
}

export default App
