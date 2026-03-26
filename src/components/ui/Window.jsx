'use client'

import { IconArrowsDiagonal, IconChevronDown, IconRectangle, IconX } from "@tabler/icons-react"
import dynamic from "next/dynamic"
import { useMemo, useState } from "react"

export default function Window({ app, onChange }) {
  const { name, state, icon: Icon, component } = app

  const Content = useMemo(() => {
    return dynamic(() => import(`../windows/${component.name}`), {
      ssr: false,
      loading: () => (
        <div>Loading...</div>
      )
    })
  }, [component.name])

  const DEFAUL_WINDOW_SIZE = { w: 1080, h: 720 }
  const [size, setSize] = useState(DEFAUL_WINDOW_SIZE)
  const [windowState, setWindowState] = useState(state || "open") // open | background | fullscreen | closed

  const handleMinimizeWindow = () => {
    setWindowState("background")
    onChange(name, "background")
  }

  const handleMaximizeWindow = () => {
    setWindowState(prev => {
      if (prev == "fullscreen") {
        setSize(DEFAUL_WINDOW_SIZE)
        onChange(name, "open")
        return "open"
      } else {
        setSize({ w: "100%", h: "100%" })
        onChange(name, "fullscreen")
        return "fullscreen"
      }
    })
  }

  const handleCloseWindow = () => {
    setWindowState("closed")
    onChange(name, "closed")
  }

  const getDisplay = () => windowState == "background" ? "none" : "block"
  const getBRadius = () => windowState == "fullscreen" ? "0px" : "8px"

  if (windowState !== "closed") return (
    <div
      className="relative border border-neutral-500 bg-white"
      style={{ width: size.w, height: size.h, display: getDisplay(), borderRadius: getBRadius() }}
    >
      <div className="w-full h-full">
        <div className="w-full flex items-center gap-1 flex-nowrap select-none bg-neutral-300" style={{ borderStartEndRadius: getBRadius() }}>
          <div className="flex-1 text-sm px-2 text-neutral-700">
            <div className="flex items-center gap-8">
              <div className="mr-4!">
                <Icon size={16} />
              </div>
              <span>{name}</span>
            </div>
          </div>
          <div
            className="size-6 flex items-center justify-center hover:bg-neutral-400"
            onClick={handleMinimizeWindow}
          >
            <IconChevronDown size={16} />
          </div>
          <div
            className="size-6 flex items-center justify-center hover:bg-neutral-400"
            onClick={handleMaximizeWindow}
          >
            {/* <IconArrowsDiagonal size={16} /> */}
            <IconRectangle size={16} />
          </div>
          <div
            className="size-6 flex items-center justify-center hover:bg-red-700 hover:text-white"
            style={{ borderTopRightRadius: getBRadius() }}
            onClick={handleCloseWindow}>
            <IconX size={16} />
          </div>
        </div>
        <div className="w-full h-[calc(100%-24px)] p-2">
          <Content />
        </div>
      </div>
    </div >
  )
}
