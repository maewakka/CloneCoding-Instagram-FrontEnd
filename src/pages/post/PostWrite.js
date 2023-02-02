import React from 'react';
import style from './PostWrite.module.css'
import {Static_Base_Url} from "../../index";
import {useSelector} from "react-redux";

const PostWrite = (props) => {
    const onChangeWrite = props.onChangeWrite;
    const userDetail = useSelector(state => state.userDetail);

    return (
        <div className={style.post_write_container}>
            <div className={style.header}>
                <img className={style.header_thumbnail} src={Static_Base_Url + userDetail.profileUrl}/>
                <div className={style.header_nickname}>{userDetail.nickname}</div>
            </div>
            <textarea className={style.inputs} name='write' onChange={onChangeWrite} placeholder="문구 입력..."></textarea>
        </div>
    );
};

export default PostWrite;