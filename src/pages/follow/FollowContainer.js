import React, {useEffect, useState} from 'react';
import style from './Follow.module.css';
import withJwtAxios from "../../components/axios/withJwtAxios";
import {Static_Base_Url} from "../../index";

const FollowContainer = () => {

    const [userList, setUserList] = useState([]);
    const getUserList = () => {
        withJwtAxios.get('/user-list')
            .then((res) => {
                setUserList(res.data.userList);
            })
    }

    const onClickFollow = (follwingEmail) => {
        withJwtAxios.get('/follow', {params: {followingEmail: follwingEmail}})
            .then((res) => {
                setUserList(res.data.userList);
            });
    }

    const onClickUnFollow = (followingEmail) => {
        withJwtAxios.delete('/follow', {params: {followingEmail: followingEmail}})
            .then((res) => {
                setUserList(res.data.userList);
            });
    }

    useEffect(() => {
        getUserList();
    }, [])

    return (
        <div className={style.follow_container}>
            {userList.map((user, idx) => {
                return(
                    <div key={idx} className={style.user_container}>
                        <div className={style.profile}>
                            <img className={style.thumbnail} src={Static_Base_Url + user.profileUrl}/>
                            <div className={style.text}>{user.nickname}</div>
                        </div>
                        {user.follow !== true?
                            <div className={style.follow} onClick={() => onClickFollow(user.email)}>팔로우</div> :
                            <div className={style.unfollow} onClick={() => onClickUnFollow(user.email)}>언팔로우</div>
                        }
                    </div>
                )
            })}
        </div>
    );
};

export default FollowContainer;