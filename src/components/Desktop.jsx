'use client'

import { useEffect } from "react";
import { APPS } from "@/lib/apps";
import Taskbar from "./Taskbar";
import Window from "./ui/Window";
import { useWindowsManager } from "@/hooks/windowsManager";

export default function Desktop() {
  const { windows, init } = useWindowsManager()

  useEffect(() => {
    init(APPS)
  }, [])

  return (
    <div className="absolute w-screen h-screen overflow-hidden">
      <img src="/assets/images/desktop-wallpaper.webp" alt="Desktop wallpaper" className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-[calc(100vh-64px-32px)]">
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-24 aspect-square cursor-pointer flex items-center justify-center border">
            icona
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-screen h-[calc(100dvh-48px)] z-100">
        {windows.map(app => (
          <Window app={app} key={app.name} />
        ))}
      </div>
      <Taskbar />
    </div>
  )
}
