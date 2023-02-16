import React from 'react';
import style from './SideBar.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Static_Base_Url} from "../../index";

const SideBar = () => {

    const userDetail = useSelector(state => state.userDetail);
    const navigate = useNavigate();

    const sideBar = [
        {link: '/outstagram/home', name: '홈', iclass: 'bi bi-instagram fs-3'},
        {link: '/outstagram/follow', name: '팔로우', iclass: 'bi bi-people fs-3'},
        {link: '/outstagram/search', name: '탐색', iclass: 'bi bi-compass fs-3'},
        {link: '/outstagram/message', name: '메세지', iclass: 'bi bi-chat fs-3'},
        {link: '/outstagram/post', name: '만들기', iclass: 'bi bi-plus-square fs-3'},
        {link: '/outstagram/profile', name: '프로필'}
    ]

    const logout = () => {
        window.localStorage.clear();
        navigate("/users/sign-in")
    }

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

            <div className="dropup-center dropup" style={{width: '100%'}}>
                <div className={style.side_menu} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-list fs-2"/>
                    <div className={style.side_menu_text}>더 보기</div>
                </div>
                <ul className="dropdown-menu">
                    <li>
                        <div className='dropdown-item' style={{cursor: 'pointer'}} onClick={logout}>
                            로그아웃
                        </div>
                    </li>
                    <li>
                        <div className='dropdown-item' style={{cursor: 'pointer'}} onClick={() => {navigate("/outstagram/profile-edit/edit")}}>
                            프로필 수정
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default SideBar;