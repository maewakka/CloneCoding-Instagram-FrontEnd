import React from 'react';
import style from './SideBar.module.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Static_Base_Url} from "../../index";

const SideBar = () => {

    const userDetail = useSelector(state => state.userDetail);

    const sideBar = [
        {link: '/outstagram/home', name: '홈', iclass: 'bi bi-instagram fs-3'},
        {link: '/outstagram/follow', name: '팔로우', iclass: 'bi bi-people fs-3'},
        {link: '/outstagram/search', name: '탐색', iclass: 'bi bi-compass fs-3'},
        {link: '/outstagram/message', name: '메세지', iclass: 'bi bi-chat fs-3'},
        {link: '/outstagram/post', name: '만들기', iclass: 'bi bi-plus-square fs-3'},
        {link: '/outstagram/profile', name: '프로필'}
    ]

    return (
        <>
            <Link to='/outstagram/home' className={style.logo_container}>
                <div className={style.logo}>
                    OutStagram
                </div>
            </Link>


            <div className={style.side_menu_container}>
                {sideBar.map((side, idx) => {
                    if(idx === sideBar.length-1) {
                        return (
                            <Link key={idx} to={side.link} className={style.side_menu}>
                                <img className={style.profile_img} src={Static_Base_Url + userDetail.profileUrl}/>
                                <div className={style.side_menu_text}>{side.name}</div>
                            </Link>
                        );
                    }
                    else {
                        return (
                            <Link key={idx} to={side.link} className={style.side_menu}>
                                <i className={side.iclass}/>
                                <div className={style.side_menu_text}>{side.name}</div>
                            </Link>
                        );
                    }
                })}
            </div>

            <div>

            </div>
        </>
    );
};

export default SideBar;