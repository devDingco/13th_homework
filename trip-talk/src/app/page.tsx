"use client";

import Image from "next/image";
import Login from "./_components/Login/Login";
import SignUp from "./_components/SignUp/SignUp";
import { useState } from "react";

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <div className="flex flex-row justify-between">
      {isSignUp ? (
        <Login onClickSignUp={() => setIsSignUp(false)} />
      ) : (
        <SignUp />
      )}
      <Image
        src="/pngs/login-signup.png"
        alt="loginSignUp"
        width={900}
        height={600}
      />
    </div>
  );
}
