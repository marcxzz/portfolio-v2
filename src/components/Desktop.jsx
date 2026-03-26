'use client'

import { useState } from "react";
import Taskbar from "./Taskbar";
import { APPS } from "@/lib/apps";
import Window from "./ui/Window";

export default function Desktop() {
  const [appsList, setAppsList] = useState(APPS)

  const handleTaskbarItemClick = (tbItem) => {
    const { state, name } = tbItem

    const map = {
      closed: "open",
      background: "open",
      open: "background",
      fullscreen: "background"
    }

    setAppsList(prev =>
      prev.map(w =>
        w.name === name
          ? { ...w, state: map[state] }
          : w
      )
    )
  }

  const handleWindowStateChange = (windowName, newState) => {
    setAppsList(prev =>
      prev.map(w =>
        w.name === windowName
          ? { ...w, state: newState }
          : w
      )
    )
  }

  return (
    <div className="absolute w-screen h-screen">
      <img src="/assets/images/desktop-wallpaper.webp" alt="Desktop wallpaper" className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-[calc(100vh-64px-32px)]">
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-24 aspect-square cursor-pointer flex items-center justify-center border">
            icona
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-screen h-[calc(100dvh-48px)] z-100">
        {appsList?.map(app => (
          <Window app={app} key={app.name} onChange={handleWindowStateChange} />
        ))}
      </div>
      <Taskbar windows={appsList} onItemClick={handleTaskbarItemClick} />
    </div>
  )
}
