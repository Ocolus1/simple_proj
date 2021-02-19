import React from 'react';
import { Jumbotron, Button, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import styles from "../css/home.module.css";
import { connect } from "react-redux";


function Home({isAuthenticated }) {
    let smile = {
        'fontSize': 40
    }

    if (isAuthenticated) {
        return <Redirect to="/main" />
    }
    return (
        <div className={styles.home_page}>
            <Container>
                <Jumbotron className="shadow-lg p-3 mb-5 mt-4 bg-white rounded">
                    <h3>Welcome to the Learning Center!<span style={smile}>&#128540;</span></h3>
                    <p>
                        If you already have an account, go ahead and <Link to="/login">log in</Link>.
                            If you are new to Leaning Center,
                            get started by creating an <Link to="/signup">account</Link>.
                        </p>
                    <p>
                        This is an application created for the department of IESA. It can be used for
                        taking quiz and setting mock test and exam for freshers.
                        </p>
                    <p>
                        <Button variant="primary">
                            <a href="mailto:awolesiboluwatife@gmail.com"
                                className="nav-link text-white"
                            >Contact Us</a>
                        </Button>
                    </p>
                </Jumbotron>
            </Container>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { })(Home);