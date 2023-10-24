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

// export function VideoGridItem({
//     id,
//     title,
//     channel,
//     views,
//     postedAt,
//     duration,
//     thumbnailUrl,
//     videoUrl,
// }: VideoGridItemProps) {
//     return <div></div>
// }
