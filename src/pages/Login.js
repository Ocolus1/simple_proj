import React, {useState} from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { connect } from "react-redux";
import { login } from "../actions/auth"
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";


function Login({ login, isAuthenticated }) {
    const { register, errors, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    const [suc,  setSuc] = useState(false);
    const [networkError, setNetworkError] = useState(false)
    const [internalError, setInternalError] = useState(false)

    const red = {
        color: "red"
    }

    const onSubmit = async (data) => {
        login(data).then(
            (res) => {
                if (res === "Network Error") {
                    setNetworkError(true)
                }
                checkMessages(res)
            }
        )
    }

    // const onFetch = async (user) => {
    //     axios.get(`${process.env.REACT_APP_API_URL}/api/`).then(
    //         (res) => {
    //             console.log(res)
    //             const users = res.data
    //             if (users.length) {
    //                 for (let i = 0; i < users.length; i++) {
    //                     let exUser = users[i].username
    //                     if(exUser === user) {
    //                         console.log(users[i])
    //                     }
    //                 }
    //             }
    //         }
            
    //     )
    // }


    const onError = (errors, e) => {
        console.log(errors, e);
    }

    const danger = (
          <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>User credentials incorrect!</Alert.Heading>
                <p>
                    Your username or password is incorrect. Try again.
                </p>
          </Alert>
        );
    
    const internalErr = (
        <Alert show={internalError} variant="danger" onClose={() => setInternalError(false)} dismissible>
            <Alert.Heading>Internal Server Error</Alert.Heading>
                <p>
                    There is a fault in the backend.<br />
                    Contact Admin to fix this problem.
                </p>
        </Alert>
    );

    const netError = (
          <Alert show={networkError} variant="danger" onClose={() => setNetworkError(false)} dismissible>
            <Alert.Heading>Network Error</Alert.Heading>
                <p>
                    There is something wrong with the connection.<br />
                    The problem is with us not you.
                </p>
          </Alert>
        );

    const success = (
          <Alert show={suc} variant="success" onClose={() => setSuc(false)} dismissible>
            <Alert.Heading>User credentials correct!</Alert.Heading>
                <p>
                    You have logged in successfully.
                </p>
          </Alert>
        );

    const checkMessages = (res) => {
        if (res === "Request failed with status code 401") {
            setShow(true)
        }else if (res === "OK") {
            setShow(false)
            setSuc(true)
        }else if (res === "Request failed with status code 500") {
            setInternalError(true)
        }
    }
    
    // if user is authenticated
    if (isAuthenticated) {
        return <Redirect to="/main" />
    }

return (
    <div>
        <Container>
            <Form onSubmit={handleSubmit(onSubmit, onError)} className="shadow-lg p-3 mb-5 mt-4 bg-white rounded">
                <div className="pl-5 pt-2 pb-5">
                    <h3 className="p-2 mx-1">Sign In</h3>
                    {danger}
                    {success}
                    {netError}
                    {internalErr}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={register({
                            required: "This field is required"
                        })}
                            name="email" className="col-sm-4"
                            placeholder="Enter your email" />
                        <span style={red}> {errors.email?.message} </span>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={register({
                            required: "This field is required"
                        })}
                            name="password" className="col-sm-4"
                            placeholder="Password" />
                        <span style={red}>{errors.password?.message}</span>
                    </Form.Group>

                    <Button variant="primary" type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </Form>
            <div>
                <p className="mt-3">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
                <p className="mt-3">
                    Forgot password? <Link to="/reset-password">Reset here.</Link>
                </p>
            </div>
        </Container>
    </div>
)
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login);