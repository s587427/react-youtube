import { useEffect, useState } from "react"

export type windowSizeProps = {
    width: number
    height: number
} | null

export function useResize() {
    const [windowSize, setWindowSize] = useState<windowSizeProps>(null)

    useEffect(() => {
        function resizeListener(): void {
            setWindowSize(() => {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight,
                }
            })
        }

        window.addEventListener("resize", resizeListener)

        return () => window.removeEventListener("resize", resizeListener)
    }, [])

    return { windowSize }
}
