"use client"

import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
    children: React.ReactNode
}

export const Provider = ({children}:ProviderProps) => {
    return <RecoilRoot>
        <SessionProvider>
            {children}
        </SessionProvider>
    </RecoilRoot>
}