import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import styles from "../css/nav.module.css"

export default function SideNav() {
    const line = {
        borderBottom: "2px solid white",
        width: "100%",
        padding: 0
    }
    return (
        <div className="d-block">
            <Nav  className="flex-column bg-dark min-vh-100 ">
                <NavLink
                exact to="/main/dashboard"
                className={styles.whitetext}
                activeStyle={{
                    color: "white",
                }}
                >
                    Profile
                    <hr style={line} />
                </NavLink>
                <NavLink
                exact to="/main/courses"
                className={styles.whitetext}
                activeStyle={{
                    color: "white",
                }}
                >
                    Courses
                    <hr style={line} />
                </NavLink>
                <NavLink
                exact to="/main/tests"
                className={styles.whitetext}
                activeStyle={{
                    color: "white",
                }}
                >
                    Tests
                    <hr style={line} />
                </NavLink>
                <NavLink
                exact to="/main/mock-e"
                className={styles.whitetext}
                activeStyle={{
                    color: "white",
                }}
                >
                    Mock-E
                    <hr style={line} />
                </NavLink>
                <NavLink
                exact to="/main/forum"
                className={styles.whitetext}
                activeStyle={{
                    color: "white",
                }}
                >
                    Forum
                    <hr style={line} />
                </NavLink>
            </Nav>
        </div>
    )
}
