'use client'

import Desktop from "@/components/Desktop";
import LockScreen from "@/components/LockScreen";
import StartupScreen from "@/components/StartupScreen";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  setTimeout(() => {
    setLoading(false)
  }, 3000);

  return (
    <main>

      {loading ? (
        <StartupScreen />
      ) : (
        <div className="absolute top-0 left-0 w-screen h-screen">
          {!loggedIn && (<LockScreen onLogIn={() => setLoggedIn(true)} />)}
          <Desktop />
        </div>
      )}
    </main>
  );
}
