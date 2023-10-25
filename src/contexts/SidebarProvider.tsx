import { ReactNode, createContext, useContext, useState } from "react"

type SidebarProviderProps = {
    children: ReactNode
}

export type SidebarContextType = {
    isLargeOpen: boolean
    isSamllOpen: boolean
    setIsSamllOpen: (value: React.SetStateAction<boolean>) => void
    toggle: () => void
    onClose: () => void
    isScreenSmall: () => boolean
}

const SidebarConetxt = createContext<SidebarContextType | null>(null)

export function useSiderbarContext() {
    const value = useContext(SidebarConetxt)
    if (SidebarConetxt == null) throw Error("Cannot use outside of SidebarProvider")
    return value
}

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [isLargeOpen, setIsLargeOpen] = useState(true)
    const [isSamllOpen, setIsSamllOpen] = useState(false)

    function isScreenSmall() {
        return window.innerWidth < 1024
    }

    function toggle() {
        if (isScreenSmall()) {
            setIsSamllOpen((preIsSmallOpen) => !preIsSmallOpen)
        } else {
            setIsLargeOpen((preIsLargeOpen) => !preIsLargeOpen)
        }
    }

    function onClose() {
        if (isScreenSmall()) {
            setIsSamllOpen(() => false)
        } else {
            setIsLargeOpen(() => false)
        }
    }

    return (
        <SidebarConetxt.Provider
            value={{ isLargeOpen, isSamllOpen, setIsSamllOpen, toggle, onClose, isScreenSmall }}
        >
            {children}
        </SidebarConetxt.Provider>
    )
}
