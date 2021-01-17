import React from 'react';
import { Navbar, Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux"
import { logout } from  "../actions/auth"

function Navigation({ logout, user}) {

    const checkLogout = () => {
        logout()
        return <Redirect to="/" />
    }

    return (
        <div>
            <Navbar bg="transparent" expand="lg">
                <Navbar.Brand href="/" >
                    {/* <Link to="/"> */}
                        <span className="font-italic display-4 text-muted">Learning Center</span>
                    {/* </Link> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className="ml-auto" inline>
                        {user ? 
                            <Link to="/">
                                <Button variant="outline-success"
                                onClick={checkLogout}
                                className="mx-1">Sign Out</Button>
                            </Link> :
                            <>
                                <Link to="/login">
                                    <Button variant="outline-success" className="mx-1">Sign In</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="info" className="mx-1">Sign Up</Button>
                                </Link>
                            </>
                        }
                        
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { logout })(Navigation);