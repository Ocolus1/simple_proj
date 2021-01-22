import React, { useState } from 'react';
import { Button, Container, Form, Col, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { signup } from "../actions/auth"
import validator from "validator"
import { Link } from 'react-router-dom';

function Signup({ signup }) {
    const { register, errors, getValues, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    const [suc,  setSuc] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [networkError, setNetworkError] = useState(false)
    const [internalError, setInternalError] = useState(false)

    const red = {
        color: "red"
    }


    const onSubmit = async (data) => {
        signup(data).then(
            (res) => {
                //checkRegistration
                if (res === "Created") {
                    setSuc(true)
                    setShow(false)
                    setUserExist(false)
                }else if (res === "Request failed with status code 400") {
                    setShow(false)
                    setSuc(false)
                    setUserExist(true)
                }else if (res === "Network Error") {
                    setNetworkError(true)
                }else if (res === "Request failed with status code 500") {
                    setInternalError(true)
                }else {
                    setShow(true)
                    setSuc(false)
                }

            }
        )
    }

    const danger = (
        <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>User credentials incorrect!</Alert.Heading>
              <p>
                  User registration was not successful. Try again.
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

    const isUser = (
        <Alert show={userExist} variant="danger" onClose={() => setUserExist(false)} dismissible>
          <Alert.Heading>User credentials incorrect!</Alert.Heading>
              <p>
                  The email already exists. Try another one.
              </p>
        </Alert>
      );

  const success = (
        <Alert show={suc} variant="success" onClose={() => setSuc(false)} dismissible>
          <Alert.Heading>User credentials correct!</Alert.Heading>
              <p>
                  User registered successfully.<br />
                  Check your mail to activate your account within the next 24hours.
              </p>
        </Alert>
      );

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)} className="shadow-lg p-3 mb-5 mt-4 bg-white rounded">
                    <div className="pl-5 pt-2 pb-5">
                        <h3 className="p-2 mx-1">Sign Up</h3>
                        {danger}
                        {success}
                        {isUser}
                        {netError}
                        {internalErr}
                        <Form.Row className="my-2">
                            <Form.Group as={Col} controlId="formBasicName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" ref={register({
                                    required: "This field is required",
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum of 8 character length' 
                                    }
                                })} 
                                name="username" className="" placeholder="Enter username" />
                                <span style={red}> {errors.username?.message} </span>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" ref={register({
                                    required: "This field is required",
                                    validate: {
                                        emailVal : (value) => validator.isEmail
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum of 8 character length' 
                                    }
                                })}  
                                name="email" className="" placeholder="Enter email" />
                                <span style={red}> {errors.email?.message} </span>
                                {errors.email?.type === "emailVal" && (
                                <span style={red}>Enter a valid email address.</span>
                                )}
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="my-2">
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={register({
                                    required: "This field is required",
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum of 8 character length' 
                                    }
                                })}  
                                name="password" className="" placeholder="Password" />
                                <span style={red}> {errors.password?.message} </span>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={register({
                                    required: "This field is required",
                                    validate : {
                                        checkMatch: (value) => 
                                        value === getValues("password") || "Password do not match",
                                        // checkMatch2: (value) =>
                                        // value === getValues("password") || 
                                        // <span style={{color: "green"}}>Passwords match</span>
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum of 8 character length' 
                                    }
                                    
                                })}  
                                name="re_password" className="" placeholder="Confirm Password" />
                            <span style={red}> {errors.re_password?.message} </span>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row >
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>User Type</Form.Label>
                                <Form.Control as="select" ref={register({
                                    required: "This field is required",
                                    validate: {
                                        useInput: (value) => value !== "" || "This field is required"
                                    }
                                })}  
                                name="user_type" defaultValue="Choose...">
                                    <option value="">Choose....</option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </Form.Control>
                            <span style={red}> {errors.user_type?.message} </span>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" className="m-2" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
                <p className="mt-3">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </Container>
        </div>
    )
}


export default connect(null, { signup })(Signup);