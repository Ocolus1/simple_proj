import React, { useState } from 'react';
import { Button, Container, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { signup } from "../actions/auth"
import validator from "validator"
import { Link, Redirect } from 'react-router-dom';

function Signup({ signup, isAuthenticated }) {
    const { register, errors, getValues, handleSubmit } = useForm();
    const [show, setShow] = useState({display: "none"});
    const [suc,  setSuc] = useState({display: "none"});
    const [userExist, setUserExist] = useState({display: "none"});
    const [networkError, setNetworkError] = useState({display: "none"})
    const [internalError, setInternalError] = useState({display: "none"})

    const red = {
        color: "red"
    }


    const onSubmit = async (data) => {
        signup(data).then(
            (res) => {
                //checkRegistration
                if (res === "Created") {
                    setSuc({display: "block"})
                    setShow({display: "none"})
                    setUserExist({display: "none"})
                }else if (res === "Request failed with status code 400") {
                    setShow({display: "none"})
                    setSuc({display: "none"})
                    setUserExist({display: "block"})
                }else if (res === "Network Error") {
                    setNetworkError({display: "block"})
                }else if (res === "Request failed with status code 500") {
                    setInternalError({display: "block"})
                }else {
                    setShow({display: "block"})
                    setSuc({display: "none"})
                }

            }
        )
    }

    const danger = (
        <div className="alert alert-danger alert-dismissible fade show" style={show} role="alert">
            <h5>User credentials incorrect!</h5>
            <p>Your username or password is incorrect. Try again.</p>
            <button type="button" onClick={() => setShow({display: "none"})} className="btn-close" ></button>
        </div>
    )
    
    const internalErr = (
        <div className="alert alert-danger alert-dismissible fade show" style={internalError} role="alert">
            <h5>Internal Server Error</h5>
            <p>
                There is a fault in the backend.<br />
                Contact Admin to fix this problem.
            </p>
            <button type="button" onClick={() => setInternalError({display: "none"})} className="btn-close" ></button>
        </div>
    );

    const netError = (
            <div className="alert alert-danger alert-dismissible fade show" style={networkError} role="alert">
                <h5>Network Error</h5>
                <p>
                    There is something wrong with the connection.<br />
                    The problem is with us not you.
                </p>
                <button type="button" onClick={() => setNetworkError({display: "none"})} className="btn-close" ></button>
            </div>
        );

    const success = (
            <div className="alert alert-success alert-dismissible fade show" style={suc} role="alert">
                <h5>An Email has been sent to you!</h5>
                <p>
                    Check your mail to activate your account.
                </p>
                <button type="button" onClick={() => setSuc({display: "none"})} className="btn-close" ></button>
            </div>
        );
      
      const isUser = (
            <div className="alert alert-danger alert-dismissible fade show" style={userExist} role="alert">
                <h5>User credentials incorrect!</h5>
                <p>
                    The email already exists. Try another one.
                </p>
                <button type="button" onClick={() => setUserExist({display: "none"})} className="btn-close" ></button>
            </div>
        );

      if (isAuthenticated) {
        return <Redirect to="/main" />
    }

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)} className="shadow-lg p-3 mb-5 mt-4 bg-white rounded">
                    <div className="pl-5 pt-2 pb-5">
                        <h3 className="p-3 mx-1">Sign Up</h3>
                        {danger}
                        {success}
                        {isUser}
                        {netError}
                        {internalErr}
                        <Form.Row className="row my-2 mb-2 p-3">
                            <Form.Group as={Col} controlId="formBasicName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" ref={register({
                                    required: "This field is required",
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum of 8 character length' 
                                    }
                                })} 
                                name="username" className="col-sm-12 col-md-6" placeholder="Enter username" />
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
                                name="email" className="col-sm-12 col-md-6" placeholder="Enter email" />
                                <span style={red}> {errors.email?.message} </span>
                                {errors.email?.type === "emailVal" && (
                                <span style={red}>Enter a valid email address.</span>
                                )}
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="row my-2 mb-2 p-3">
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={register({
                                    required: "This field is required",
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum of 8 character length' 
                                    }
                                })}  
                                name="password" className="col-sm-12 col-md-6" placeholder="Password" />
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
                                name="re_password" className="col-sm-12 col-md-6" placeholder="Confirm Password" />
                            <span style={red}> {errors.re_password?.message} </span>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="row mb-2 p-3">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>User Type</Form.Label>
                                <select className="form-select" ref={register({
                                        required: "This field is required",
                                        validate: {
                                            useInput: (value) => value !== "" || "This field is required"
                                        }
                                    })}  
                                    name="user_type" defaultValue="Choose...">
                                    <option value="">Choose....</option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            <span style={red}> {errors.user_type?.message} </span>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" className="m-3" type="submit">
                            Register
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})


export default connect(mapStateToProps, { signup })(Signup);