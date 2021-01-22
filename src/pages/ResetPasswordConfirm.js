import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth"
import { useForm } from "react-hook-form";
import { Alert } from 'react-bootstrap';

function ResetPasswordConfirm({ match, reset_password_confirm }) {
    const [requestSent, setRequestSent] = useState(false);
    const { register, handleSubmit} = useForm();
    const [show, setShow] = useState(false);
    const [networkError, setNetworkError] = useState(false)
    const [internalError, setInternalError] = useState(false)


    const onSubmit = async (data) => {

        const uid = match.params.uid;
        const token = match.params.token;

        const datas = data;

        datas["uid"] = uid;
        datas["token"] = token;

        reset_password_confirm(datas).then(
            (res) => {
                //checkRegistration
                console.log(res)
                if (res === 204) {
                    setRequestSent(true)
                }else if (res === "Request failed with status code 400") {
                    setShow(true)
                }else if (res === "Network Error") {
                    setNetworkError(true)
                }else if (res === "Request failed with status code 500") {
                    setInternalError(true)
                }else {
                    setShow(true)
                }

            }
        )
    }

    const danger = (
        <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>User credentials incorrect!</Alert.Heading>
              <p>
                  Your username or password is incorrect. Try again.
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
    if (requestSent) {
        return <Redirect to="/" />
    }

    return (
        <div className="container mt-5">
            <h1>Type New Password</h1>
            {danger}
            {netError}
            {internalErr}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input
                        type="password"
                        name="new_password"
                        className="form-control"
                        placeholder="New Password"
                        ref={register}
                        minLength="6"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="re_new_password"
                        className="form-control"
                        placeholder="Confirm New Password"
                        ref={register}
                        minLength="6"
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit">Reset Password</button>
            </form>

        </div>
    )
}


export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);