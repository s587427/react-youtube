import React, { ElementType, ReactNode, useEffect, useState } from "react"
import {
    HiOutlineBuildingLibrary,
    HiOutlineAtSymbol,
    HiOutlineFilm,
    HiOutlineHome,
    HiOutlineChevronDown,
    HiOutlineChevronUp,
    HiOutlineClock,
    HiOutlineMagnifyingGlassCircle,
    HiOutlineQueueList,
    HiOutlineFire,
    HiOutlineShoppingBag,
    HiOutlineMusicalNote,
    HiOutlineTv,
    HiOutlineGiftTop,
    HiOutlineNewspaper,
    HiSignal,
    HiOutlineTrophy,
    HiOutlineMegaphone,
} from "react-icons/hi2"

import { Button, buttonStyles } from "../components/Button"
import { twMerge } from "tailwind-merge"
import { playlists, subscriptions } from "../data/sidebar"
import { SidebarContextType, useSiderbarContext } from "../contexts/SidebarProvider"
import { PageHeaderFirstSection } from "./PageHeader"
import { windowSizeProps } from "../hooks/useResize"

// TODO 放大的時候根據他的large open狀態來決定要選哪一個large版型, 到最小就一個版型

export type SidebarProps = {
    windowSize: windowSizeProps
}

export function Sidebar({ windowSize }: SidebarProps) {
    const { isLargeOpen, isSamllOpen, setIsSamllOpen, onClose, isScreenSmall } =
        useSiderbarContext() as SidebarContextType

    useEffect(() => {
        if (!isScreenSmall()) {
            setIsSamllOpen(false)
        }
    }, [windowSize])

    return (
        <>
            {/*  小版 */}
            <aside
                className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 hidden md:flex flex-col ml-1 ${
                    isLargeOpen ? "lg:hidden" : "lg:flex"
                }`}
            >
                <SmallSidebarItem Icon={HiOutlineHome} title="Home" url="/home" />
                <SmallSidebarItem Icon={HiOutlineFilm} title="Short" url="/shorts" />
                <SmallSidebarItem
                    Icon={HiOutlineAtSymbol}
                    title="Subscriptions"
                    url="/subscriptions"
                />
            </aside>

            {/* 小型打開灰階背色 */}
            {/* fixed根據瀏覽器定位,  (abs/fixed + inset-0小技巧可以做遮罩子填滿父) */}
            {isSamllOpen && (
                <div
                    onClick={onClose}
                    className="lg:hidden fixed inset-0 z-[999] opacity-50 bg-secondary-dark"
                ></div>
            )}

            {/* 大版 */}
            {/* postion lg以上stikey, 否則absoulte */}

            <aside
                className={`${isLargeOpen ? "lg:flex" : "lg:hidden"}
                ${isSamllOpen ? "flex z-[999] bg-white h-screen" : "hidden"}         
                flex-col w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden gap-2 px-2 pb-4 z-20`}
            >
                <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                    <PageHeaderFirstSection />
                </div>

                <LargeSidebarSection>
                    <LargeSidebarItem
                        IconOrImageUrl={HiOutlineHome}
                        title="Home"
                        url="/home"
                        isActive
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={HiOutlineAtSymbol}
                        title="Subscriptions"
                        url="/subscriptions"
                    />
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItem
                        IconOrImageUrl={HiOutlineBuildingLibrary}
                        title="Library"
                        url="/libaray"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={HiOutlineMagnifyingGlassCircle}
                        title="History"
                        url="/history"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={HiOutlineFilm}
                        title="Your Videos"
                        url="/your-videos"
                    />
                    <LargeSidebarItem IconOrImageUrl={HiOutlineClock} title="Watch Later" url="/" />
                    {playlists.map((playlist) => {
                        return (
                            <LargeSidebarItem
                                key={playlist.id}
                                IconOrImageUrl={HiOutlineQueueList}
                                title={playlist.name}
                                url={`/playlist?list=${playlist.id}`}
                            />
                        )
                    })}
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection title="Subscriotions" visibleItemCount={7}>
                    {subscriptions.map((subscription) => {
                        return (
                            <LargeSidebarItem
                                key={subscription.id}
                                IconOrImageUrl={subscription.imgUrl}
                                title={subscription.channelName}
                                url={`/@${subscription.id}`}
                            />
                        )
                    })}
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection title="Explore">
                    <LargeSidebarItem
                        IconOrImageUrl={HiOutlineFire}
                        title="Trending"
                        url="/trending"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={HiOutlineShoppingBag}
                        title="Shopping"
                        url="/shopping"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={HiOutlineMusicalNote}
                        title="Music"
                        url="/music"
                    />
                    <LargeSidebarItem
                        IconOrImageUrl={HiOutlineTv}
                        title="Movees & tv"
                        url="/movees & tv"
                    />
                    <LargeSidebarItem IconOrImageUrl={HiSignal} title="Live" url="/live" />
                    <LargeSidebarItem IconOrImageUrl={HiOutlineGiftTop} title="Game" url="/game" />
                    <LargeSidebarItem
                        IconOrImageUrl={HiOutlineNewspaper}
                        title="News"
                        url="/news"
                    />
                    <LargeSidebarItem IconOrImageUrl={HiOutlineTrophy} title="Sport" url="/sport" />
                    <LargeSidebarItem
                        IconOrImageUrl={HiOutlineMegaphone}
                        title="Podcast"
                        url="/podcast"
                    />
                </LargeSidebarSection>
            </aside>
        </>
    )
}

// 小板
type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
}

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
    return (
        <a
            href={url}
            className={twMerge(
                buttonStyles({ variant: "ghost" }),
                "py-4 px-2 flex flex-col items-center gap-1 rounded-lg"
            )}
        >
            <Icon className="w-6 h-6" />
            <div className="text-sm">{title}</div>
        </a>
    )
}

// 大版

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSidebarSection({
    children,
    title,
    visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = React.Children.toArray(children) //  !: React.Children.toArray 可以將children 轉成一個扁平的陣列
    const showExpandButton = childrenArray.length > visibleItemCount
    const ButtonIcon = isExpanded ? HiOutlineChevronUp : HiOutlineChevronDown
    const visibleChilren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)
    console.log({ childrenArray, gg: childrenArray.flat() })

    return (
        <div>
            {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
            {visibleChilren}
            {showExpandButton && (
                <Button
                    onClick={() => setIsExpanded((preIsExpanded) => !preIsExpanded)}
                    variant="ghost"
                    className="w-full flex items-center rounded-lg gap-4 p-3"
                >
                    <ButtonIcon className="w-6 h-6" />
                    <div>{isExpanded ? "Show Less" : "Show More"}</div>
                </Button>
            )}
        </div>
    )
}

type LargeSidebarItemProps = {
    IconOrImageUrl: ElementType | string
    title: string
    url: string
    isActive?: boolean
}

function LargeSidebarItem({ IconOrImageUrl, title, url, isActive = false }: LargeSidebarItemProps) {
    return (
        <a
            href={url}
            className={twMerge(
                buttonStyles({ variant: "ghost" }),
                `w-full flex items-center rounded-lg gap-4 ${
                    isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : ""
                }`
            )}
        >
            {typeof IconOrImageUrl == "string" ? (
                <img src={IconOrImageUrl} className="w-6 h-6 rounded-full" />
            ) : (
                <IconOrImageUrl className="w-6 h-6" />
            )}

            <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
        </a>
    )
}
