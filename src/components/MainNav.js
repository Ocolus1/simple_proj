import React from 'react'
import { Navbar, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MainNav() {
    return (
        <div>
            <Navbar bg="transparent" expand="lg">
                <Navbar.Brand href="#home">
                    <span className="font-italic display-4 text-muted">Learning Center</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className="ml-auto" inline>
                        <Link to="/">
                            <Button variant="outline-success" className="mx-1">Sign Out</Button>
                        </Link>
                        
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
