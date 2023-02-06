import React, {useState} from 'react';
import style from './ProfileEdit.module.css';
import {Link, Outlet} from "react-router-dom";

const ProfileEdit = () => {
    const sideBar = [
        {number: '0', link: '/outstagram/profile-edit/edit', text: '프로필 편집'},
        {number: '1', link: '/outstagram/profile-edit/password', text: '비밀번호 변경'}
    ]

    const [sideState, setSideState] = useState(
        [true, false]
    );

    const onClickSide = (idx) => {
        const temp = new Array(sideState.length).fill(false);
        temp[idx] = true;
        setSideState(temp);
    }

    return (
        <div className={style.profile_modify_container}>
            <div className={style.side_bar}>
                {sideBar.map((side) => {
                    return(
                        <Link className={style.link} key={side.number} to={side.link} onClick={() => onClickSide(side.number)} style={sideState[side.number] ? {borderLeft:'2px solid black', fontWeight:'bolder'} : {}}>
                            {side.text}
                        </Link>
                    );
                })}
            </div>
            <div className={style.main}>
                <Outlet/>
            </div>
        </div>
    );
};

export default ProfileEdit;