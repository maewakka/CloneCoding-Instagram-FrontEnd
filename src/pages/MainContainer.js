import React, {useEffect, useState} from 'react';
import SideBar from "./sidebar/SideBar";
import {Outlet, useNavigate} from "react-router-dom";
import style from './Main.module.css';
import withJwtAxios from "../components/axios/withJwtAxios";
import {useDispatch, useSelector} from "react-redux";
import {init} from "../redux/modules/UserDetailModule";
import axios from "axios";

const MainContainer = () => {
    const userDetail = useSelector(state => state.userDetail);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    useEffect(() => {
        if(token.length === 0) {
            return
        }
        withJwtAxios.get("/profile")
            .then((res) => {
                dispatch(init(res.data));
                navigate("/outstagram/home")
            }).catch(() => {
                window.location.reload();
        })
    }, [token]);

    useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
    }, [])

    return (
        <div className={style.outstagram_container}>
            <div className={style.sidebar_container}>
                <SideBar/>
            </div>
            <div className={style.main_container}>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainContainer;