import {
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT,
    SET_MESSAGE
} from "./types"

import axios from "axios";


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem("access") })

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== "token_not_valid") {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
                dispatch({
                    type: SET_MESSAGE,
                    payload: res.data.message,
                });
            }
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();
            dispatch({
                type: AUTHENTICATED_FAIL
            })
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
};

export const login = (data) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify(data);

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res
        })
        dispatch(load_user());
        alert("Login successful")
        return res.statusText
    } catch (err) {
        const message = err.message;
        dispatch({
            type: LOGIN_FAIL,
            payload: message,
        })
        return message
    }
};

export const signup = (data) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const dat = data;
    if (dat["user_type"] === "student") {
        dat["is_student"] = true
        dat["is_teacher"] = !dat["is_student"]
        delete dat["user_type"]
    } else if (dat["user_type"] === "teacher") {
        dat["is_student"] = false
        dat["is_teacher"] = !dat["is_student"]
        delete dat["user_type"]
    }

    const body = JSON.stringify(dat);

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: res.data
        })
        console.log(res.data)
        return res.statusText
    } catch (err) {
        const message = err.message;
        dispatch({
            type: REGISTRATION_FAIL
        })
        console.log(message)
        return message
    }
};


export const verify = (data) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(data);

    try {
        let res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
        dispatch({
            type: ACTIVATION_SUCCESS,
        })
        alert("Your account is successfully activated")
        return res.status
    }catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
        console.log(err)
        return err.message
    }
}


export const reset_password = (data) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(data);
    console.log(body)

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })
        alert("Url sent to mail successfully")
        return res.status
    } catch (err) {
        const message = err.message;
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
        return message
    }
}

export const reset_password_confirm = (datas) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(datas);
    console.log(body)

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
        alert("Password successfully changed")
        return res.status
    } catch (err) {
        const message = err.message;
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
        return message;
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
}
