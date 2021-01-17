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
            payload: res.data
        })
        dispatch(load_user());
        alert("Login successful")
    } catch (err) {
        const message = err.message;
        dispatch({
            type: LOGIN_FAIL,
            payload: message,
        })
    }
};

export const register = (email, username, password, re_password, is_student, is_teacher) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email, username, password, re_password, is_student, is_teacher });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: res.data
        })
        dispatch({
            type: SET_MESSAGE,
            payload: res.data.message,
        });
    } catch (err) {
        dispatch({
            type: REGISTRATION_FAIL
        })
        const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
    }
};


export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })
        dispatch({
            type: SET_MESSAGE,
            payload: res.data.message,
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
        const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
        dispatch({
            type: SET_MESSAGE,
            payload: res.data.message,
        });
        
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
        const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
}
