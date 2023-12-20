import {Axios} from 'axios'

export const httpClient = new Axios({
    baseURL: "http://localhost:8080/"
})


httpClient.interceptors.request.use((request) => {
    const token = localStorage.getItem("token")
    if(token) {
        request.headers.Authorization = `Bearer ${token}`
    }
    return request
})
