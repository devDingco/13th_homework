"use client";

import Image from "next/image";
import Login from "./_components/Login/Login";
import SignUp from "./_components/SignUp/SignUp";
import { useState } from "react";

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <div className="flex flex-row justify-between">
      <div className="max-w-96">
        {isSignUp ? (
          <Login onClickSignUp={() => setIsSignUp(false)} />
        ) : (
          <SignUp />
        )}
      </div>
      <div className="relative w-full h-[700px]">
        <Image src="/pngs/login-signup.png" alt="loginSignUp" fill />
      </div>
    </div>
  );
}
