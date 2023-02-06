import React, {useEffect, useState} from 'react';
import style from './Profile.module.css';
import {useSelector} from "react-redux";
import {Static_Base_Url} from "../../index";
import withJwtAxios from "../../components/axios/withJwtAxios";
import {useNavigate} from "react-router-dom";
import Post from "./post/Post";
const ProfileContainer = () => {

    const userDetail = useSelector(state => state.userDetail);
    const navigate = useNavigate();
    const [profileCount, setProfileCount] = useState(
        {board: 0, follower: 0, follow: 0}
    );
    const [postList, setPostList] = useState();
    const [postIsOpen, setPostIsOpen] = useState();

    const getProfileCount = () => {
        withJwtAxios.get("/profiles/count")
            .then((res) => {
                setProfileCount(res.data);
            })
    }

    const getPostList = () => {
        withJwtAxios.get("/post-my-list")
            .then((res) => {
                setPostList(res.data.postList);
                setPostIsOpen(new Array(res.data.postList.length).fill(false));
            })
    }

    const deletePost = (postId) => {
        if(window.confirm("삭제 하시겠습니까?") === true) {
            withJwtAxios.delete("/post", {params: {postId: postId}})
                .then((res) => {
                    setPostList(res.data.postList);
                })
        }
    }

    useEffect(() => {
        getProfileCount();
        getPostList();
    }, [])

    return (
        <>
            <div className={style.profile_container}>
                <img className={style.profile_thumbnail} src={Static_Base_Url + userDetail.profileUrl}/>
                <div>
                    <div className={style.profile_container_head}>
                        <div className={style.nickname}>
                            {userDetail.nickname}
                        </div>
                        <button className='btn btn-outline-dark btn-sm' style={{fontWeight: 'bold'}} onClick={() => navigate('/outstagram/profile-edit/edit')}>프로필 수정</button>
                    </div>
                    <div className={style.profile_count}>
                        <div className={style.count}>게시물 {profileCount.board}</div>
                        <div className={style.count}>팔로워 {profileCount.follower}</div>
                        <div className={style.count}>팔로우 {profileCount.follow}</div>
                    </div>
                </div>
            </div>
            <div className={style.post_container}>
                <Post postList={postList} setPostList={setPostList} postIsOpen={postIsOpen} setPostIsOpen={setPostIsOpen} deletePost={deletePost}/>
            </div>
        </>
    );
};

export default ProfileContainer;