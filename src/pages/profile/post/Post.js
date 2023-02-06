import React, {useState} from 'react';
import style from './Post.module.css';
import {Static_Base_Url} from "../../../index";
import PostDetail from "./PostDetail";

const Post = (props) => {
    const postList = props.postList;
    const postIsOpen = props.postIsOpen;
    const setPostIsOpen = props.setPostIsOpen;
    const deletePost = props.deletePost;

    const onClickPost = (idx) => {
        const temp = JSON.parse(JSON.stringify(postIsOpen));
        temp[idx] = true;
        setPostIsOpen(temp);
    }

    const onClickExitPost = (idx) => {
        const temp = JSON.parse(JSON.stringify(postIsOpen));
        temp[idx] = false;
        setPostIsOpen(temp);
    }

    const fileRender = (url) => {
        const extension = url.split('/').pop().split('.').pop();

        if(['mp4', 'mov', 'avi', 'wmv', 'MP4', 'MOV', 'AVI', 'WMV'].includes(extension)) {
            return(
                <video className={style.image} src={url} />
            )
        } else {
            return(
                <img className={style.image} src={url} />
            )
        }
    }

    return (
        <>
            <div className={style.header}>
                <i className="bi bi-border-all fs-5"/>
                <div className={style.header_title}>게시물</div>
            </div>
            <div>
                {postList !== undefined ?
                    <div className={style.container}>
                        {postList.map((post, idx) => {
                            const thumbnail = Static_Base_Url + post.postFileList[0].fileUrl;

                            return(
                                <div key={idx}>
                                    <div  className={style.row} onClick={() => onClickPost(idx)}>
                                        {fileRender(thumbnail)}
                                    </div>
                                    <PostDetail post={post} isOpen={postIsOpen[idx]} idx={idx} onClickExitPost={onClickExitPost} deletePost={deletePost}/>
                                </div>
                            )
                        })
                        }
                    </div> :
                    <div></div>
                }
            </div>
        </>

    );
};

export default Post;