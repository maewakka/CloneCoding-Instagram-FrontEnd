import React, {useEffect, useState} from 'react';
import ReactModal from "react-modal";
import style from './PostDetail.module.css';
import {Static_Base_Url} from "../../../index";
import withJwtAxios from "../../../components/axios/withJwtAxios";

const PostDetail = (props) => {
    const isOpen = props.isOpen;
    const idx = props.idx;
    const onClickExitPost = props.onClickExitPost;
    const post = props.post;
    const postFileList = post.postFileList;
    const deletePost = props.deletePost;

    const ChatModalStyle = {
        overlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.45)",
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        content: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            background: "white",
            padding: 0,
            top: '10%',
            left: '25%',
            width: '1000px',
            height: '600px',
            WebkitOverflowScrolling: "touch",
            borderRadius: "14px",
            outline: "none",
            zIndex: 10,
            flexWrap: 'wrap'
        },
    }

    const [fileIndex, setFileIndex] = useState(0);
    const [chatList, setChatList] = useState();

    const fileRender = (url) => {
        const extension = url.split('/').pop().split('.').pop();

        if(['mp4', 'mov', 'avi', 'wmv', 'MP4', 'MOV', 'AVI', 'WMV'].includes(extension)) {
            return(
                <video className={style.file} src={url} />
            )
        } else {
            return(
                <img className={style.file} src={url} />
            )
        }
    }

    const onClickLeft = () => {
        if(fileIndex > 0) {
            setFileIndex(() => {
                return fileIndex-1
            })
        }
    }

    const onClickRight = () => {
        if(fileIndex < postFileList.length - 1) {
            setFileIndex(() => {
                return fileIndex+1
            })
        }
    }

    const setChatCreateDate = (date) => {
        const createDate = new Date(date)
        const nowDate = new Date();

        const diff = (nowDate.getTime() - createDate.getTime()) / 1000;

        if (diff < 3600) {
            return `${Math.floor(diff/60)} 분전`;
        } else if(diff < 86400) {
            return `${Math.floor(diff/3600)} 시간전`;
        } else if(diff < 864000) {
            return `${Math.floor(diff/86400)} 일전`;
        } else {
            return '오래전';
        }
    }

    useEffect(() => {
        withJwtAxios.get("/posts/chat", {params: {postId: post.postId}})
            .then((res) => {
                setChatList(res.data.postChatList);
            })
    }, [post])

    return (
        <ReactModal isOpen={isOpen} style={ChatModalStyle} ariaHideApp={false}>
            <div className={style.head}>
                <div style={{color: 'red', cursor: 'pointer', fontWeight:'bold'}} onClick={() => deletePost(post.postId)}>
                    게시물 삭제
                </div>
                <i className="bi bi-x-lg modal-exit-button" style={{cursor: 'pointer'}} onClick={() => {onClickExitPost(idx)}}/>
            </div>
            <div className={style.body}>
                <div className={style.file_box}>
                    <div className={style.arrow_left} onClick={onClickLeft} style={{display: fileIndex === 0 ? 'none' : 'inherit'}}>
                        <i className="bi bi-arrow-left-circle"></i>
                    </div>
                    {fileRender(Static_Base_Url + postFileList[fileIndex].fileUrl)}
                    <div className={style.arrow_right} onClick={onClickRight} style={{display: fileIndex === postFileList.length-1 ? 'none' : 'inherit'}}>
                        <i className="bi bi-arrow-right-circle"></i>
                    </div>
                </div>
                <div className={style.body_content}>
                    <div className={style.content_box}>
                        <img className={style.profile_thumbnail} src={Static_Base_Url + post.user.profileUrl}/>
                        <div className={style.profile_nickname}>
                            {post.user.nickname}
                        </div>
                        <div className={style.content}>{post.content.slice(1, post.content.length-1)}</div>
                    </div>
                    <div className={style.chat_list}>
                        {chatList !== undefined ?
                            chatList.map((chat, idx) => {
                                return(
                                    <div key={idx} className={style.chat_box}>
                                        <img className={style.profile_thumbnail} src={Static_Base_Url + chat.profileUrl} />
                                        <div className={style.profile_nickname}>
                                            {chat.nickname}
                                            <div className={style.chat_date}>
                                                {setChatCreateDate(chat.createdDate)}
                                            </div>
                                        </div>
                                        <div className={style.content}>
                                            {chat.content}
                                        </div>
                                    </div>
                                )
                            })
                            : <div></div>
                        }
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default PostDetail;