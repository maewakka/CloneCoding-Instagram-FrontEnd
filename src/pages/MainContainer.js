import React, {useEffect} from 'react';
import SideBar from "./sidebar/SideBar";
import {Outlet} from "react-router-dom";
import style from './Main.module.css';
import withJwtAxios from "../components/axios/withJwtAxios";
import {useDispatch, useSelector} from "react-redux";
import {init} from "../redux/modules/UserDetailModule";

const MainContainer = () => {
    const userDetail = useSelector(state => state.userDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        withJwtAxios.get("/profile")
            .then((res) => {
                dispatch(init(res.data));
            });
    }, []);

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