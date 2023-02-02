import React, {useState} from 'react';
import style from './Sign.module.css';
import {useNavigate} from "react-router-dom";
import authAxios from "../../components/axios/authAxios";

const SignUp = () => {
    const signup = [
        {name: 'email', type: 'text', placeholder: '이메일'},
        {name: 'password', type: 'password', placeholder: '비밀번호'},
        {name: 'name' ,type: 'text', placeholder: '성명'},
        {name: 'nickname' ,type: 'text', placeholder: '닉네임'},
        {name: 'phone' ,type: 'text', placeholder: '핸드폰번호'}
    ]

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: '',
        nickname: '',
        phone: ''
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
        authAxios.post("/join", inputs)
            .then((res) => {
                alert(res.data);
                navigate("/users/sign-in");
            })
            .catch((err) => {
                alert(err.response.data);
            });
    };

    return (
        <>
            <div className={style.sign_input_container}>
                <div className={style.logo}>
                    OutStagram
                </div>
                {signup.map((component, idx) => {
                    return (<input key={idx} className={style.inputs} name={component.name} type={component.type} placeholder={component.placeholder} onChange={onChange}/>);
                })}
                <button className={style.buttons} onClick={onSubmit}>회원가입</button>
            </div>

            <div className={style.sign_nav_container}>
                <div>
                    계정이 있으신가요?
                </div>
                <div className={style.nav_link} onClick={() => navigate('/users/sign-in')}>
                    로그인
                </div>
            </div>
        </>
    );
};

export default SignUp;