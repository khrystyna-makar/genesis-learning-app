import React from "react"
import {Outlet, Link} from 'react-router-dom'

export default function Layout() {
    return (
        <div>
            <header>
                <Link className="site-logo" to="/">#GENESIS</Link>
            </header>
            <Outlet/>
            <footer>&#169; 2023 #GENESIS</footer>
        </div>
    )
}