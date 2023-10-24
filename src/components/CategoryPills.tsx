import { HiChevronLeft, HiChevronRight } from "react-icons/hi2"
import { Button } from "./Button"
import { useEffect, useRef, useState } from "react"

type CategoryPillsProps = {
    categories: string[]
    selectedCategory: string
    onSelect: (category: string) => void
}

const TRANSALTE_X = 200

export function CategoryPills({ categories, selectedCategory, onSelect }: CategoryPillsProps) {
    const [translateX, setTranslateX] = useState(0)
    const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false)
    const [isRightArrowVisible, setIsRightArrowVisible] = useState(true)
    const pillsContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (pillsContainerRef.current == null) return

        setIsLeftArrowVisible(translateX < 0)

        setIsRightArrowVisible(
            Math.abs(translateX) + pillsContainerRef.current.clientWidth <
                pillsContainerRef.current.scrollWidth
        )

        console.log({ translateX })
    }, [pillsContainerRef, translateX, categories])

    return (
        <div className="relative overflow-x-hidden" ref={pillsContainerRef}>
            {isLeftArrowVisible && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full z-10">
                    <Button
                        className="aspect-square w-auto h-full"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            setTranslateX((preTranslateX) => {
                                const newTranslateX = preTranslateX + TRANSALTE_X
                                if (newTranslateX >= 0) return 0
                                return newTranslateX
                            })
                        }}
                    >
                        <HiChevronLeft />
                    </Button>
                </div>
            )}

            <div
                className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
                style={{ transform: `translateX(${translateX}px)` }}
            >
                {categories.map((category) => {
                    return (
                        <Button
                            key={category}
                            className="rounded-lg px-4"
                            variant={selectedCategory === category ? "dark" : "default"}
                            onClick={() => onSelect(category)}
                        >
                            {category}
                        </Button>
                    )
                })}
            </div>

            {isRightArrowVisible && (
                <div className="flex justify-end absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full z-10">
                    <Button
                        className="aspect-square w-auto h-full"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            if (pillsContainerRef.current == null) return

                            // 可視關寬度不包含卷軸
                            const pillsContainerWidth = pillsContainerRef.current.clientWidth
                            // 包含卷軸的全部寬度
                            const pillsContainerEdge = pillsContainerRef.current.scrollWidth

                            console.log({ pillsContainerWidth, pillsContainerEdge })

                            setTranslateX((preTranslateX) => {
                                const newTranslateX = preTranslateX - TRANSALTE_X

                                if (
                                    pillsContainerWidth + Math.abs(newTranslateX) >
                                    pillsContainerEdge
                                ) {
                                    return (pillsContainerEdge - pillsContainerWidth) * -1
                                } else {
                                    return newTranslateX
                                }
                            })
                        }}
                    >
                        <HiChevronRight />
                    </Button>
                </div>
            )}
        </div>
    )
}
