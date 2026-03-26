export default function Button({ children: text, onClick }) {
  return (
    <button type="button" className="rounded-lg border-neutral-500 bg-white p-1 px-4 text-black inline-flex items-center gap-2" onClick={onClick}>
      {text}
    </button>
  )
}
