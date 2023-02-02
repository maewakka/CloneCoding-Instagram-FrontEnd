import React, {useEffect} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";

const HomeContainer = () => {

    const userDetail = useSelector(state => state.userDetail);

    useEffect(() => {

    }, [])

    return (
        <div>
            Home
        </div>
    );
};

export default HomeContainer;