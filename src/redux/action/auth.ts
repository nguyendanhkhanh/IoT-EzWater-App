import { LOGIN_SUCCESS, LOG_OUT } from "../type"

export type Auth = {
    email: string | null
}

export function loginSuccess (payload: Auth) {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}
export function logout() {
    return {
        type: LOG_OUT,
    }
}