import { useWindowsManager } from "@/hooks/windowsManager";
import TaskbarItem from "./ui/TaskbarItem";

export default function Taskbar() {
  const { windows, toggleFromTaskbar } = useWindowsManager()

  return (
    <div className="absolute bottom-0 left-0 w-screen backdrop-blur-sm p-1 h-12 bg-gray-950/50 flex text-white">
      <div className="flex items-end justify-center gap-1 flex-1">
        {windows.map(w => (
          <TaskbarItem window={w} key={w.name} onClick={() => toggleFromTaskbar(w.name)} />
        ))}
      </div>
    </div>
  )
}
