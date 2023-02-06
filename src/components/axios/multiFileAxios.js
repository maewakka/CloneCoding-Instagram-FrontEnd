import axios from "axios";;

const headers = {
    'Content-type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
}

const multiFileAxios = axios.create({
    baseURL: '/api',
    headers: headers
});

multiFileAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        alert(error.response.data);
        return Promise.reject(error);
    }
);
export default multiFileAxios;