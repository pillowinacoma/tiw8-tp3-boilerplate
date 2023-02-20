import React, { memo, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { movePlayer, setHeight, setWidth } from '../slices/board-slice'
import { useAppSelector } from '../hooks'
import samplemap from '@/img/samplemap_16.png'
import alex from '@/img/Alex.png'
import bob from '@/img/Bob.png'
import adam from '@/img/Adam.png'
import amelia from '@/img/Amelia.png'
import { useCallback, useEffect } from 'react'
import { AvatarPicker } from './avatar-picker'

export const Board: React.FC = () => {
  const board = useAppSelector((state) => state.board)
  const gridRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  const tileWidth = Math.floor(window.innerHeight / 60) 

  const playerPosition: [number, number] = useAppSelector(
    (state) => state.playerPosition
  )
  const remotePlayerPosition: [number, number] = useAppSelector(
    (state) => state.remotePlayerPosition
  )
  const playerAvatar: string = useAppSelector((state) => state.playerAvatar)
  const remotePlayerAvatar: string = useAppSelector(
    (state) => state.remotePlayerAvatar
  )

  const keyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      console.log(event.code)
      console.log(playerPosition)
      let newPosition = playerPosition
      if (event.code === 'ArrowUp') {
        newPosition = [playerPosition[0], (playerPosition[1] - 1) % board.width]
      }
      if (event.code === 'ArrowDown') {
        newPosition = [playerPosition[0], (playerPosition[1] + 1) % board.width]
      }
      if (event.code === 'ArrowLeft') {
        newPosition = [(playerPosition[0] - 1) % board.width, playerPosition[1]]
      }
      if (event.code === 'ArrowRight') {
        newPosition = [(playerPosition[0] + 1) % board.width, playerPosition[1]]
      }
      console.log(newPosition)
      dispatch(movePlayer(newPosition, false))
    },
    [playerPosition]
  )

  const boardStyle = {
    display: `grid`,
    gridTemplateColumns: `repeat(60, ${tileWidth}px)` as const,
    gridTemplateRows: `repeat(60, ${tileWidth}px)` as const,
    gridColumnGap: `0px` as const,
    gridRowGap: `0px` as const,
    backgroundImage: `url(` + samplemap + `)`,
    backgroundSize: `${60 * tileWidth}px` as const,
    backgroundRepeat: `no-repeat` as const,
}

  const cellStyle: React.CSSProperties = {
    width: `${tileWidth}px`,
    padding: '0px',
    textAlign: 'center',
  }

  const avatarImg = (name: string) => {
    switch (name) {
      case 'Adam':
        return `${adam}`
      case 'Amelia':
        return `${amelia}`
      case 'Alex':
        return `${alex}`
      case 'Bob':
        return `${bob}`
    }
    return ''
  }

  const displayPlayers = () => {
    let i = 0
    const grid = []
    for (i = 0; i < board.width * board.height; i++) {
      if (i === playerPosition[1] * board.width + playerPosition[0]) {
        grid.push(
          <div style={cellStyle} key={i}>
            <img src={avatarImg(playerAvatar)}></img>
          </div>
        )
      } else if (
        i ===
        remotePlayerPosition[1] * board.width + remotePlayerPosition[0]
      ) {
        grid.push(
          <div style={cellStyle} key={i}>
            <img src={avatarImg(remotePlayerAvatar)}></img>
          </div>
        )
      } else {
        grid.push(<div style={cellStyle} key={i}></div>)
      }
    }
    return grid
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [keyDownHandler])

  return (
    <div className="flex flex-row space-x-2 max-h-screen h-screen">
      <div className="flew-grow-0 h-screen aspect-square" ref={gridRef} style={boardStyle}>
        {displayPlayers()}
      </div>
      {/* <div className="flex-grow-0 flex-col space-y-2">
        <AvatarPicker></AvatarPicker>
        <div className="item h-48">Video1 Placeholder</div>
        <div className="item h-48">Video2 Placeholder</div>
      </div> */}
    </div>
  )
}
