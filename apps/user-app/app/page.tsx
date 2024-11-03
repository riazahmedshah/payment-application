"use client"
import {Appbar} from "@repo/ui/appbar"
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Appbar onSignin={signIn} onSignout={signOut} />
      <div className="text-2xl font-bold text-gray-400">User App page</div>
    </>
  );
}
