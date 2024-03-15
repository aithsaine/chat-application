import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
})

export const csrf = async () => {
    await api.get("sanctum/csrf-cookie")
}
