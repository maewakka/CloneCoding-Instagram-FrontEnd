import React, {useState} from 'react';
import style from './Edit.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Static_Base_Url} from "../../../index";
import withJwtAxios from "../../../components/axios/withJwtAxios";
import multiFileAxios from "../../../components/axios/multiFileAxios";
import {init} from "../../../redux/modules/UserDetailModule";
import {useNavigate} from "react-router-dom";
const Edit = () => {

    const userDetail = useSelector(state => state.userDetail);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        nickname: userDetail.nickname,
        introduce: userDetail.introduce,
        phone: userDetail.phone,
        gender: userDetail.gender,
        email: userDetail.email
    });

    const handleChangeThumbnail = (e) => {
        const file = e.target.files[0];
        if(file != null) {
            const formData = new FormData();
            formData.append("file", file);

            multiFileAxios.post("/profiles/thumbnail", formData)
                .then((res) => {
                    dispatch(init(res.data));
                });
        }
    }

    const onChangeInputs = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const submitInputs = () => {
        if(window.confirm("수정 하시겠습니까?") === true) {
            withJwtAxios.post("/profiles/profile", inputs)
                .then((res) => {
                    alert("수정이 완료되었습니다.")
                    dispatch(init(res.data));
                    navigate("/outstagram/profile")
                });
        }
    }

    return (
        <>
            <div className={style.thumbnail_container}>
                <div className={style.thumbnail_box}>
                    <label htmlFor="file">
                        <img className={style.thumbnail} src={Static_Base_Url + userDetail.profileUrl}/>
                    </label>
                    <input type='file' id='file' accept='image/*' style={{display: 'none'}} onChange={handleChangeThumbnail}>
                    </input>
                </div>
                <div className={style.nickname_box}>
                    <div className={style.nickname}>
                        {userDetail.nickname}
                    </div>
                    <label htmlFor="file">
                        <div className={style.thumbnail_edit_button}>
                            프로필 사진 바꾸기
                        </div>
                    </label>
                </div>
            </div>
            <div className={style.input_box}>
                <label className={style.label}>닉네임</label>
                <input className={style.input} name='nickname' value={inputs.nickname} onChange={onChangeInputs}/>
            </div>
            <div className={style.input_box}>
                <label className={style.label}>소개</label>
                <textarea className={style.input} name='introduce' value={inputs.introduce} onChange={onChangeInputs}/>
            </div>
            <div className={style.input_box}>
                <label className={style.label}>이메일</label>
                <input className={style.input} name='email' value={inputs.email} onChange={onChangeInputs} disabled/>
            </div>
            <div className={style.input_box}>
                <label className={style.label}>전화번호</label>
                <input className={style.input} name='phone' value={inputs.phone} onChange={onChangeInputs}/>
            </div>
            <div className={style.input_box}>
                <label className={style.label}>성별</label>
                <input className={style.input} name='gender' value={inputs.gender} onChange={onChangeInputs}/>
            </div>

            <button className='btn btn-primary' onClick={submitInputs}>제출</button>
        </>
    );
};

export default Edit;