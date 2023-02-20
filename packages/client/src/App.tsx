import { FC } from 'react'
import { AvatarPicker } from './components/avatar-picker'
import { Board } from './components/board'

const App: FC = () => {
  return (
    <div className="h-screen bg-slate-800">
      <Board />
      <AvatarPicker/>
    </div>
  )
}

export default App
