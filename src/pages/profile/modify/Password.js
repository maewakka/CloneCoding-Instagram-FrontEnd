import React, {useState} from 'react';
import style from './Edit.module.css'
import {useSelector} from "react-redux";
import withJwtAxios from "../../../components/axios/withJwtAxios";
import {useNavigate} from "react-router-dom";
const Password = () => {

    const userDetail = useSelector(state => state.userDetail);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        prevPw: '',
        changePw: '',
        changePwCheck: '',
        email: userDetail.email
    });

    const handleChangeInputs = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const submitPassword = () => {
        withJwtAxios.post("/password", inputs)
            .then((res) => {
                alert(res.data);
                navigate("/outstagram/profile")
            })
    }

    return (
        <>
            <div className={style.input_box}>
                <label className={style.label}>현재 비밀번호</label>
                <input className={style.input} name='prevPw' onChange={handleChangeInputs} type='password'/>
            </div>
            <div className={style.input_box}>
                <label className={style.label}>변경할 비밀번호</label>
                <input className={style.input} name='changePw' onChange={handleChangeInputs} type='password'/>
            </div>
            <div className={style.input_box}>
                <label className={style.label}>비밀번호 확인</label>
                <input className={style.input} name='changePwCheck' onChange={handleChangeInputs} type='password'/>
            </div>

            <button className='btn btn-primary' onClick={submitPassword}>제출</button>
        </>
    );
};

export default Password;