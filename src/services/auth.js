import api from "./api";

export const loginApi = (data) => {
    const res = api.post('/accounts/login/',data)
    return res
}