import { useState } from "react"
import { CategoryPills } from "./components/CategoryPills"
import { PageHeader } from "./layouts/PageHeader"
import { categories, videos } from "./data/home"
import { VideoGridItem } from "./components/VideoGridItem"
import { useResize } from "./hooks/useResize"

export default function App() {
    const [selectedCategory, setSeletedCategory] = useState(categories[0])

    const { windowSize } = useResize()

    return (
        <div className="max-h-screen flex flex-col">
            <PageHeader />
            <div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
                <div>sidebar</div>
                {/* 類別 + 影片 */}
                <div className="overflow-x-hidden px-8 pb-4">
                    <div className="sticky top-0 bg-white z-10 pb-4">
                        <CategoryPills
                            windowSize={windowSize}
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelect={setSeletedCategory}
                        />
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                        {videos.map((video) => {
                            return <VideoGridItem key={video.id} {...video} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
