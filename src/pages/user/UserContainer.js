import React from 'react';
import style from "./User.module.css";
import {Outlet} from "react-router-dom";

const UserContainer = () => {
    return (
        <div className={style.user_container}>
            <Outlet/>
        </div>
    );
};

export default UserContainer;