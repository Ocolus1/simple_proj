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
    LOGOUT
} from "../actions/types"

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    message: null
};

export default function auth(state = initialState, action) {
    const {type, payload} = action;

    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.data.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.data.access,
                refresh: payload.data.refresh,
                message: payload.status
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case LOGIN_FAIL:
        case REGISTRATION_FAIL:
        case LOGOUT:
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null,
                message: payload
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}