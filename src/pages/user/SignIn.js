import React, {useEffect, useState} from 'react';
import style from './Sign.module.css';
import {useNavigate} from "react-router-dom";
import authAxios from "../../components/axios/authAxios";

const SignIn = () => {
    const [token, setToken] = useState('');

    const signin = [
        {name: 'email', type: 'text', placeholder: '이메일'},
        {name: 'password', type: 'password', placeholder: '비밀번호'}
    ]

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const onSubmit = () => {
        authAxios.post("/login", inputs)
            .then((res) => {
                const accessToken = res.data.accessToken;
                setToken(accessToken);
                alert("로그인에 성공하였습니다!");
            })
            .catch((err) => {
                alert(err.response.data);
            });
    };

    useEffect(() => {
        if(token.length === 0) {
            return
        }
        localStorage.setItem('accessToken', token);
        navigate("/outstagram")
    }, [token])

    return (
        <>
            <div className={style.sign_input_container}>
                <div className={style.logo}>
                    OutStagram
                </div>
                {signin.map((component, idx) => {
                    return (<input key={idx} className={style.inputs} name={component.name} type={component.type} placeholder={component.placeholder} onChange={onChange}/>);
                })}
                <button className={style.buttons} onClick={onSubmit}>로그인</button>
            </div>

            <div className={style.sign_nav_container}>
                <div>
                    계정이 없으신가요?
                </div>
                <div className={style.nav_link} onClick={() => navigate('/users/sign-up')}>
                    가입하기
                </div>
            </div>
        </>
    );
};

export default SignIn;