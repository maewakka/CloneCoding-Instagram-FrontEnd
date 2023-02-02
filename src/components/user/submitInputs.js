import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SubmitInputs = (url, data) => {
    const navigate = useNavigate();

    axios.post('/api/auth/'+url, data)
        .then((res) => {
            if(url === 'join') {
                navigate("/users/sign-in")
            }
        })
        .catch((err) => {
            alert(err.data);
        });
}

export default SubmitInputs;