import { IconArrowRight } from "@tabler/icons-react";
import Button from "./ui/Button";

export default function LockScreen({ onLogIn }) {
  return (
    <div className="absolute w-screen h-screen flex flex-col gap-4 items-center justify-center bg-neutral-900/90 text-white backdrop-blur-lg z-500">
      <p className="text-2xl font-semibold">Ciao!</p>
      <Button onClick={onLogIn}>
        Log in
        <IconArrowRight />
      </Button>
    </div>
  )
}