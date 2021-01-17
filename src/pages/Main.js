import React from 'react'
import { Container } from 'react-bootstrap'
import MainNav from '../components/MainNav'

export default function Main() {
    return (
        <div>
            <Container>
                <MainNav />
                <div>
                    The main page
                </div>
            </Container>
        </div>
    )
}
