import { create } from "zustand"

export const useWindowsManager = create((set, get) => ({
  windows: [],

  init: (apps) => {
    const vw = window.innerWidth
    const vh = window.innerHeight

    set({
      windows: apps.map((app, i) => ({
        ...app,
        zIndex: i + 1,
        position: { x: 32 + i * 32, y: 32 + i * 32 },
        size: { width: vw / 3, height: vh / 2 }
      }))
    })
  },

  openWindow: (name) => {
    const mazZ = Math.max(0, ...get().windows.map(w => w.zIndex))

    set({
      windows: get().windows.map(w => (
        w.id === name
          ? { ...w, state: "open", zIndex: mazZ + 1 }
          : w
      ))
    })
  },

  toggleFromTaskbar: (name) => {
    const { windows } = get()

    const map = {
      closed: "open",
      background: "open",
      open: "background",
      fullscreen: "background"
    }

    const maxZ = Math.max(...windows.map(w => w.zIndex))

    set({
      windows: windows.map(w =>
        w.name === name
          ? {
              ...w,
              state: map[w.state],
              zIndex: maxZ + 1
            }
          : w
      )
    })
  },

  focusWindow: (name) => {
    const maxZ = Math.max(...get().windows.map(w => w.zIndex))

    set({
      windows: get().windows.map(w =>
        w.name === name
          ? {
              ...w,
              zIndex: maxZ + 1
            }
          : w
      )
    })
  },

  updateWindow: (name, data) => set({
    windows: get().windows.map(w =>
      w.name === name ? { ...w, ...data } : w
    )
  })
}))