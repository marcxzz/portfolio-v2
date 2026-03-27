'use client'

import { useWindowsManager } from "@/hooks/windowsManager"
import { IconChevronDown, IconSquare, IconX } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"

export default function Window({ app }) {
  const focusWindow = useWindowsManager(s => s.focusWindow)
  const updateWindow = useWindowsManager(s => s.updateWindow)

  const [localPosition, setLocalPosition] = useState(app.position)
  const [localSize, setLocalSize] = useState(app.size)
  const positionRef = useRef(localPosition)
  const sizeRef = useRef(localSize)

  useEffect(() => {
    setLocalPosition(app.position)
  }, [app.position])

  useEffect(() => {
    positionRef.current = localPosition
  }, [localPosition])

  useEffect(() => {
    sizeRef.current = localSize
  }, [localSize])


  const Component = app.component
  const Icon = app.icon

  const isFullscreen = app.state == "fullscreen"
  const borderRadius = isFullscreen ? 0 : 8
  const isHidden = app.state === "closed" || app.state === "background"
  const windowStyle = {
    position: "absolute",
    zIndex: app.zIndex,
    display: isHidden ? "none" : "block",
    ...(isFullscreen
      ? {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: 0
      }
      : {
        transform: `translate3d(${localPosition.x}px, ${localPosition.y}px, 0)`,
        width: localSize.width,
        height: localSize.height,
        borderRadius: 8
      })
  }

  const handleMinimize = () => { updateWindow(app.name, { state: "background" }) }
  const handleMaximize = () => { updateWindow(app.name, { state: app.state === "fullscreen" ? "open" : "fullscreen" }) }
  const handleClose = () => { updateWindow(app.name, { state: "closed" }) }

  const dragData = useRef({
    isDragging: false,
    offsetX: 0,
    offsetY: 0
  })
  const handleMouseDown = (e) => {
    if (isFullscreen || dragData.current.isDragging) return
    e.preventDefault()

    dragData.current.isDragging = true

    dragData.current.offsetX = e.clientX - localPosition.x
    dragData.current.offsetY = e.clientY - localPosition.y

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }
  const handleMouseMove = (e) => {
    if (!dragData.current.isDragging) return

    const x = e.clientX - dragData.current.offsetX
    const y = e.clientY - dragData.current.offsetY

    setLocalPosition({ x, y })
  }
  const handleMouseUp = () => {
    dragData.current.isDragging = false

    updateWindow(app.name, {
      position: positionRef.current
    })

    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  const resizeData = useRef({
    isResizing: false,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0
  })
  const handleResizeMouseDown = (e) => {
    if (resizeData.current.isResizing) return
    e.preventDefault()
    e.stopPropagation()

    resizeData.current = {
      isResizing: true,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: localSize.width,
      startHeight: localSize.height
    }

    document.addEventListener("mousemove", handleResizeMouseMove)
    document.addEventListener("mouseup", handleResizeMouseUp)
  }
  const handleResizeMouseMove = (e) => {
    if (!resizeData.current.isResizing) return

    const width = Math.max(300, resizeData.current.startWidth + (e.clientX - resizeData.current.startX))
    const height = Math.max(200, resizeData.current.startHeight + (e.clientY - resizeData.current.startY))

    setLocalSize({ width, height })
  }
  const handleResizeMouseUp = () => {
    resizeData.current.isResizing = false

    updateWindow(app.name, {
      size: sizeRef.current
    })

    document.removeEventListener("mousemove", handleResizeMouseMove)
    document.removeEventListener("mouseup", handleResizeMouseUp)
  }

  return (
    <div
      className="border border-neutral-500 bg-white overflow-hidden shadow-xl shadow-black/35"
      style={windowStyle}
      onMouseDown={() => focusWindow(app.name)}
    >
      <div className="w-full h-full">
        <div
          className="w-full flex items-center gap-1 flex-nowrap select-none bg-neutral-200"
          style={{
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius
          }}
        >
          <div
            className="flex-1 text-sm px-2 text-neutral-600"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-1!">
              <Icon size={16} />
              <span className="font-semibold">{app.name}</span>
            </div>
          </div>
          <div
            className="size-8 flex items-center justify-center hover:bg-neutral-400"
            onClick={handleMinimize}
          >
            <IconChevronDown size={18} strokeWidth={2} />
          </div>
          <div
            className="size-8 flex items-center justify-center hover:bg-neutral-400"
            onClick={handleMaximize}
          >
            <IconSquare size={14} strokeWidth={2} />
          </div>
          <div
            className="size-8 flex items-center justify-center hover:bg-red-700 hover:text-white"
            style={{ borderTopRightRadius: borderRadius }}
            onClick={handleClose}
          >
            <IconX size={18} strokeWidth={2} />
          </div>
        </div>
        <div className="w-full h-[calc(100%-24px)] p-2">
          <Component />
        </div>

        {/* resize trigger */}
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute -bottom-2 -right-2 w-5 h-5 cursor-se-resize select-none"
        />
      </div>
    </div >
  )
}
