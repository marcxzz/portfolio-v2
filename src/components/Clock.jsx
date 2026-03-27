import { useEffect, useState } from "react"

export default function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interal = setInterval(() => {
      setTime(new Date())
    }, 1000);

    return () => clearInterval(interal)
  }, [])

  return (
    <div className="text-xs tabular-nums text-right h-full flex flex-col justify-center px-2">
      <div>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
      <div
        // className="text-[11px]"
      >{time.toLocaleDateString()}</div>
    </div>
  )
}
