import Logo from "../assets/react.svg"

import {
    HiArrowLeft,
    HiBars3,
    HiMicrophone,
    HiOutlineBell,
    HiOutlineMagnifyingGlass,
    HiOutlinePlusCircle,
    HiOutlineUser,
} from "react-icons/hi2"
import { Button } from "../components/Button"
import { useState } from "react"

export function PageHeader() {
    const [fullWidthSearch, setFullWidthSearch] = useState(false)

    return (
        <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
            <div
                className={`${
                    fullWidthSearch ? "hidden" : "flex"
                } gap-4 items-center flex-shrink-0`}
            >
                <Button variant="ghost" size="icon">
                    <HiBars3 className="w-full h-full" />
                </Button>
                <a href="#">
                    <img src={Logo}></img>
                </a>
            </div>
            {/* md 斷點以上顯示否則隱藏 */}
            <form
                className={`${
                    fullWidthSearch ? "flex" : "md:flex hidden"
                }  flex-grow justify-center gap-4`}
            >
                {fullWidthSearch && (
                    <Button variant="ghost" size="icon" onClick={() => setFullWidthSearch(false)}>
                        <HiArrowLeft />
                    </Button>
                )}

                <div className="flex flex-grow max-w-[600px]">
                    <input
                        className="w-full 
                        border border-secondary-border 
                        shadow-inner shadow-secondary 
                        rounded-l-full 
                        py-1 px-4 text-lg
                        focus:border-blue-500 outline-none"
                        placeholder="Search"
                        type="search"
                    />
                    <Button className="rounded-r-full border border-secondary-border border-l-0  py-2 px-4 flex-shrink-0">
                        <HiOutlineMagnifyingGlass className="w-full h-full" />
                    </Button>
                </div>
                <Button className="flex-shrink-0" type="button" size="icon">
                    <HiMicrophone className="w-full h-full" />
                </Button>
            </form>

            <div className={`${fullWidthSearch ? "hidden" : "flex"} flex-shrink-0 md:gap-2`}>
                <Button
                    className="md:hidden flex"
                    variant="ghost"
                    size="icon"
                    onClick={() => setFullWidthSearch(true)}
                >
                    <HiOutlineMagnifyingGlass className="w-full h-full" />
                </Button>
                <Button className="md:hidden flex" variant="ghost" size="icon">
                    <HiMicrophone className="w-full h-full" />
                </Button>
                <Button variant="ghost" size="icon">
                    <HiOutlinePlusCircle className="w-full h-full" />
                </Button>
                <Button variant="ghost" size="icon">
                    <HiOutlineBell className="w-full h-full" />
                </Button>
                <Button variant="ghost" size="icon">
                    <HiOutlineUser className="w-full h-full" />
                </Button>
            </div>
        </div>
    )
}
