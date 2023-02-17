import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
    'Access-Control-Allow-Origin': '*',
}

const withJwtAxios = axios.create({
    baseURL: '/api',
    headers: headers
});

withJwtAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // const code = error.response.status;
        // if(code === 403) {
        //     window.location.reload();
        //     alert("오류가 발생하였습니다. 다시 로그인 해주세요");
        //     window.location.href = "/users/sign-in";
        // } else {
        //     alert(error.response.data);
        // }
        // alert(error.response.data);
        return Promise.reject(error);
    }
);
export default withJwtAxios;