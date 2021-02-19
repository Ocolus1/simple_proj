import React from 'react';
import { Navbar, Form, Button, Nav } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux"
import { logout } from  "../actions/auth"
import styles from "../css/nav.module.css"
import { NavLink } from "react-router-dom"

function Navigation({ logout, user}) {

    const checkLogout = () => {
        logout()
        return <Redirect to="/" />
    }

    return (
        <div>
            <Navbar  className="shadow p-3 mb-0 bg-white rounded" expand="lg">
                <Navbar.Brand href="/main" >
                    {/* <Link to="/"> */}
                        <span className="fst-italic fs-3 ms-3 text-muted">Learning Center</span>
                    {/* </Link> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="">
                    {user ? 
                        <>
                            <Nav className="justify-content-center ms-5 ps-5" activeKey="/main/dashboard">
                                <Nav.Item>
                                    <NavLink
                                    exact to="/main/dashboard"
                                    className={styles.darktext}
                                    activeStyle={{
                                        color: "black",
                                    }}
                                    >
                                    Dashboard
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink
                                    exact to="/about"
                                    className={styles.darktext}
                                    activeStyle={{
                                        color: "black",
                                    }}
                                    >
                                    About
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink
                                    exact to="/blog"
                                    className={styles.darktext}
                                    activeStyle={{
                                        color: "black",
                                    }}
                                    >
                                        Blog
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink
                                    exact to="/contact"
                                    className={styles.darktext}
                                    activeStyle={{
                                        color: "black",
                                    }}
                                    >
                                        Contact
                                    </NavLink>
                                </Nav.Item>
                            </Nav>
                            <Form className="ms-auto" inline>
                                <Link to="/">
                                    <Button variant="outline-success"
                                    onClick={checkLogout}
                                    className="mx-2">Sign Out</Button>
                                </Link> 
                            </Form>
                        </>
                        :
                        <Form className="ms-auto" inline>
                            <Link to="/login">
                                <Button variant="outline-success" className="mx-1">Sign In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="primary" className="mx-1">Sign Up</Button>
                            </Link>
                        </Form>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { logout })(Navigation);