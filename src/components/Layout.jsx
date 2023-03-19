import React from "react"
import {Outlet, Link} from 'react-router-dom'

export default function Layout() {
    return (
        <div>
            <header>
                <Link className="site-logo" to="/">
                    <span className="material-icons">school</span>
                    GENESIS
                </Link>
            </header>
            <Outlet/>
            <footer>&#169; 2023 &nbsp;  <span className="material-icons">school</span> &nbsp; GENESIS</footer>
        </div>
    )
}