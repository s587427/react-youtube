import { useState, useRef, useEffect } from "react"
import { formatDuration } from "../utils/formatDuration"
import { formatTimeAgo } from "../utils/formatTimeAgo"

type VideoGridItemProps = {
    id: string
    title: string
    channel: {
        id: string
        name: string
        profileUrl: string
    }
    views: number
    postedAt: Date
    duration: number
    thumbnailUrl: string
    videoUrl: string
}

const VIEW_FORMATTER = new Intl.NumberFormat("tw", { notation: "compact" })

export function VideoGridItem({
    id,
    title,
    channel,
    views,
    postedAt,
    duration,
    thumbnailUrl,
    videoUrl,
}: VideoGridItemProps) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current == null) return
        if (isVideoPlaying) {
            videoRef.current.currentTime = 0
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [isVideoPlaying])

    return (
        <div
            className="flex flex-col gap-2"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}
        >
            <a href={`/watch?v=${id}`} className="relative aspect-video">
                <img
                    src={thumbnailUrl}
                    className={`block w-full h-full object-cover transition-[border-radius] duration-500  ${
                        isVideoPlaying ? "rounded-none" : "rounded-xl"
                    }`}
                />

                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm p-1 rounded">
                    {formatDuration(duration)}
                </div>

                {/* muted set 是否禁音, playsInline set 在元素播放區域內播放*/}
                {/* inset top、right、bottom、left縮寫 依序為上右下左*/}
                {/*  inset-0 表 top,right,botom,left都等於0 */}
                <video
                    className={`block h-full absolute inset-0 transition-opacity duration-200 ${
                        isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
                    }`}
                    src={videoUrl}
                    ref={videoRef}
                    muted
                    playsInline
                    controls
                ></video>
            </a>

            <div className="flex gap-2 cursor-pointer">
                <a href={`/@${channel.id}`} className="flex-shrink-0">
                    <img src={channel.profileUrl} className="w-12 h-12 rounded-full" />
                </a>
                <div className="flex flex-col gap-1">
                    <a href={`/watch?v=${id}`} className="font-bold">
                        {title}
                    </a>
                    <a href={`/watch?v=${id}`} className="text-secondary-text text-sm">
                        {title}
                    </a>
                    <div className="text-secondary-text text-sm">
                        {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
                    </div>
                </div>
            </div>
        </div>
    )
}
