import React, { useState } from 'react';
import {  Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth"
import { Alert } from 'react-bootstrap';


function Activate({ verify, match }) {
    const [verified, setVerified] = useState(false)
    const [show, setShow] = useState(false)
    const [networkError, setNetworkError] = useState(false)
    const [internalError, setInternalError] = useState(false)

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;
        const data = {
            "uid": uid,
            "token": token
        }
        verify(data).then(
            (res) => {
                console.log(res)
                if (res === 204){
                    setVerified(true)
                }else if (res === "Network Error") {
                    setNetworkError(true)
                }else if (res === "Request failed with status code 400") {
                    setShow(true)
                }else if (res === "Request failed with status code 500") {
                    setInternalError(true)
                }
            }
        )
        
    }

    const danger = (
        <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Something went wrong!</Alert.Heading>
              <p>
                  Contact Admin to resolve this issue.
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

    const internalErr = (
    <Alert show={internalError} variant="danger" onClose={() => setInternalError(false)} dismissible>
        <Alert.Heading>Internal Server Error</Alert.Heading>
            <p>
                There is a fault in the backend.<br />
                Contact Admin to fix this problem.
            </p>
    </Alert>
    );

    //is user Authenticated 
    //redirect them to the homepage
    if (verified){
        return <Redirect to="/" />
    }

    return (
        <div className="container mt-5">
            <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ marginTop: "200px"}}
            >
                {danger}
                {netError}
                {internalErr}
                <h1>Verify your Account</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: "50px" }}
                    type="button"
                    className="btn btn-primary"
                >
                        Verify
                </button>
            </div>
        </div>
    )
}



export default connect(null, { verify })(Activate);