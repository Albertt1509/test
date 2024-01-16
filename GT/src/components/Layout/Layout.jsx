import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"
export default function Layout() {
    return (
        <div className="">
            <Navbar />
            <Outlet />
        </div>
    )
}