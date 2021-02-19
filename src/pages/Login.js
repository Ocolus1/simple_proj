import React, {useState} from 'react';
import { Button, Container, Form} from 'react-bootstrap';
import { connect } from "react-redux";
import { login } from "../actions/auth"
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";


function Login({ login, isAuthenticated }) {
    const { register, errors, handleSubmit } = useForm();
    const [show, setShow] = useState({display: "none"});
    const [suc,  setSuc] = useState({display: "none"});
    const [networkError, setNetworkError] = useState({display: "none"})
    const [internalError, setInternalError] = useState({display: "none"})
    const [see, setSee] = useState(true)
    const [color, setColor] = useState("black")

    const red = {
        color: "red"
    }

    const toogleSee = () => {
        setSee(!see)
        if (see === false){
            setColor("black")
        }else{
            setColor("#0275d8")
        }
    }

    const onSubmit = async (data) => {
        login(data).then(
            (res) => {
                if (res === "Network Error") {
                    setNetworkError({display: "block"})
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
            <div className="alert alert-danger alert-dismissible fade show" style={suc} role="alert">
                <h5>User credentials correct!</h5>
                <p>
                    You have logged in successfully.
                </p>
                <button type="button" onClick={() => setSuc({display: "none"})} className="btn-close" ></button>
            </div>
        );
    

    const checkMessages = (res) => {
        if (res === "Request failed with status code 401") {
            setShow({display: "block"})
        }else if (res === "OK") {
            setShow({display: "none"})
            setSuc({display: "block"})
        }else if (res === "Request failed with status code 500") {
                    setInternalError({display: "block"})
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
                    <Form.Group  className="row mb-3 p-3" >
                        <div className="col-md-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={register({
                                required: "This field is required"
                            })}
                                name="email" className="col-md-4"
                                placeholder="Enter your email" />
                            <span style={red}> {errors.email?.message} </span>
                        </div>
                    </Form.Group>
                    <Form.Group className="row mb-4 p-3">
                        <div className="col-md-4">
                            <Form.Label>Passwords<br /> </Form.Label>
                            <div className="position-relative">
                                <Form.Control type={ see ? "password" : "text" } ref={register({
                                    required: "This field is required"
                                })}
                                    name="password" className="col-sm-4"
                                    placeholder="Password" />
                                <div className="position-absolute top-0 end-0 mt-2 pe-3">
                                    <i className="fa fa-eye" onClick={toogleSee} style={{color: color}}></i>
                                </div>
                                <span style={red}>{errors.password?.message}</span>
                            </div>
                        </div>
                    </Form.Group>
                    
                    <Button variant="primary" className="m-3" type="submit"
                    >
                        Login
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