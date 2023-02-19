import { FC, PointerEventHandler, useEffect, useRef, useState } from 'react'

const Home: FC = () => {
  const blobRef = useRef<HTMLDivElement>(null)

  const animate: PointerEventHandler = (e) => {
    const { clientX, clientY, width, height } = e
    const decimalX = (clientX / window.innerWidth) * 100,
      decimalY = (clientY / window.innerHeight) * 100
    blobRef.current?.animate(
      {
        left: `${decimalX}%`,
        top: `${decimalY}%`,
      },
      { duration: 3000, fill: 'forwards' }
    )
  }
  return (
    <div
      className="h-screen w-screen max-w-screen-sm max-h-screen"
      onPointerMove={animate}
    >
      <div
        ref={blobRef}
        className="
				bg-white h-72 aspect-square max-h-screen left-1/2 top-1/2 
				-translate-y-1/2 -translate-x-1/2 rounded-full absolute
				bg-gradient-to-tr from-purple-500 to-green-500 
        blur-[100px]
				"
      />
    </div>
  )
}
export default Home

