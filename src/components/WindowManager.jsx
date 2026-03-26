'use client'

import { useState } from "react"
import Window from "./ui/Window"

export default function WindowManager({ windows, onWindowChange }) {
  const [currentWindow, setCurrentWindow] = useState(null)

  return (
    <div className="absolute top-0 left-0 w-screen h-[calc(100dvh-48px)] z-100">
      {windows?.map(w => (
        <Window windowObj={w} key={w.name} onChange={onWindowChange} />
      ))}
    </div>
  )
}
