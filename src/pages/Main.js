import React from 'react'
import { Container } from 'react-bootstrap'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';


function Main({ isAuthenticated }) {
    if(!isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <Container>
                <div>
                    The main page
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { })(Main);