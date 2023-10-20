import Logo  from "../assets/react.svg";

import {HiBars3} from "react-icons/hi2";
import { Button } from "../components/Button";

export function PageHeader(){
    return <div className="flex gap-10 lg:gap-20 justify-between">
        <div className="flex gap-4 items-center flex-shrink-0">
            <Button variant="ghost" size="icon">
                <HiBars3 className="w-full h-full"/>
            </Button>
            <a href="#">
                <img src={Logo}></img>
            </a>
        </div>
        <div></div>
        <div></div>
    </div>;
}