import TaskbarItem from "./ui/TaskbarItem";

export default function Taskbar({ windows, onItemClick }) {
  return (
    // <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-2xl backdrop-blur-md p-1 w-fit h-fit bg-black/50">
    //   <div className="flex items-center justify-center gap-1">
    //   <TaskbarItem name="Example">a</TaskbarItem>
    //   <TaskbarItem name="Example">b</TaskbarItem>
    //   <TaskbarItem name="Example">c</TaskbarItem>
    //   </div>
    // </div>
    <div className="absolute bottom-0 left-0 w-screen backdrop-blur-sm p-1 h-12 bg-gray-950/50">
      <div className="flex items-end justify-center gap-1">
        {windows?.map(w => (
          <TaskbarItem window={w} key={w.name} onClick={() => onItemClick(w)} />
        ))}
      </div>
    </div>
  )
}
