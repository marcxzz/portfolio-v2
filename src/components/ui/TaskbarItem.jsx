export default function TaskbarItem({ window, onClick }) {
  const { name, icon: Icon, state } = window

  const getClassName = () => {
    const states = {
      "open": "taskbar-item-open",
      "fullscreen": "taskbar-item-open",
      "background": "taskbar-item-background",
      "closed": ""
    }
    return states[state]
  }

  return (
    <div
      className={`taskbar-item ${getClassName()}`}
      title={name}
      onClick={onClick}
    >
      <Icon />
    </div>
  )
}
