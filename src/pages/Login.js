import React, {useState} from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { connect } from "react-redux";
import { login } from "../actions/auth"
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";



function Login({ login, message, isAuthenticated }) {
    const { register, errors, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    const [suc,  setSuc] = useState(false);


    const red = {
        color: "red"
    }


    const onSubmit = async (data) => {
        login(data)
        checkMessages();
    }


    // if user is authenticated
    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    

    const danger = (
          <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>User credentials incorrect!</Alert.Heading>
                <p>
                    Your username or password is incorrect. Try again.
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

    const checkMessages = () => {
        if(message === "Request failed with status code 401") {
            setShow(true)
        }


    }
    

return (
    <div>
        <Container>
            <Navigation />
            <Form onSubmit={handleSubmit(onSubmit)} className="shadow-lg p-3 mb-5 mt-4 bg-white rounded">
                <div className="pl-5 pt-2 pb-5">
                    <h3 className="p-2 mx-1">Sign In</h3>
                    {danger}
                    {success}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="text" ref={register({
                            required: "This field is required"
                        })}
                            name="username" className="col-sm-4"
                            placeholder="Enter your username" />
                        <span style={red}> {errors.username?.message} </span>
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
    message: state.auth.message
})

export default connect(mapStateToProps, { login })(Login);