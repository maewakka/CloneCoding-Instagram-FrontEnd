import axios from "axios";

const headers = {
    'Access-Control-Allow-Origin': '*',
}

const authAxios = axios.create({
    baseURL: '/api/users',
    headers: headers
});

authAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default authAxios;