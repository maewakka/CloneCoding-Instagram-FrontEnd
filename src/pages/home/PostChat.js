import React, {useEffect, useState} from 'react';
import style from './PostChat.module.css';
import ReactModal from "react-modal";
import withJwtAxios from "../../components/axios/withJwtAxios";
import {Static_Base_Url} from "../../index";
import {useSelector} from "react-redux";

const PostChat = (props) => {
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
            justifyContent: "space-between",
            background: "white",
            padding: 0,
            overflow: "auto",
            top: '10%',
            left: '40%',
            width: '500px',
            height: '600px',
            WebkitOverflowScrolling: "touch",
            borderRadius: "14px",
            outline: "none",
            zIndex: 10,
        },
    }

    const isOpen = props.isOpen;
    const idx = props.idx;
    const onClickExitChat = props.onClickExitChat;
    const postId = props.postId;
    const chatIsOpen = props.chatIsOpen;

    const [chatList, setChatList] = useState();
    const [chat, setChat] = useState();
    const userDetail = useSelector(state => state.userDetail);

    const onChangeChat = (e) => {
        setChat(e.target.value);
    }

    const onSubmit = () => {
        withJwtAxios.post("/posts/chat", {postId: postId, content: chat})
            .then((res) => {
                setChatList(() => {
                    return res.data.postChatList
                });
            })
    }

    const getChatList = () => {
        withJwtAxios.get("/posts/chat", {params: {postId: postId}})
            .then((res) => {
                setChatList(() => {
                    return res.data.postChatList
                });
            })
    }

    const deleteChat = (chatId) => {
        if(window.confirm("삭제 하시겠습니까?") === true) {
            withJwtAxios.delete("/posts/chat", {params: {postId: postId, chatId: chatId}})
                .then((res) => {
                    setChatList(() => {
                        return res.data.postChatList
                    });
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
        getChatList();
    }, [chatIsOpen])

    return (
        <ReactModal isOpen={isOpen} style={ChatModalStyle} ariaHideApp={false}>
            <div className={style.post_chat_header}>
                <i className="bi bi-x-lg modal-exit-button" style={{cursor: 'pointer'}} onClick={() => {onClickExitChat(idx)}}/>
            </div>
            <div className={style.post_chat_body}>
                {chatList != undefined ?
                    chatList.map((chat) => {
                            return (
                                <div key={chat.chatId}>
                                    <div className={style.chat_container}>
                                        <div className={style.chat_container}>
                                            <img className={style.chat_thumbnail} src={Static_Base_Url + chat.profileUrl}/>
                                            <div style={{marginRight: '10px'}}>
                                                <div style={{fontWeight: 'bold',  whiteSpace: 'nowrap'}}>{chat.nickname}</div>
                                                <div className={style.chat_date}>
                                                    {setChatCreateDate(chat.createdDate)}
                                                </div>
                                            </div>
                                            <div className='modal-chat-content'>{chat.content}</div>
                                        </div>
                                        {userDetail.email === chat.email ?
                                            <i className='i bi-x-square' style={{cursor: 'pointer'}} onClick={() => deleteChat(chat.chatId)}/>
                                            :
                                            <div>
                                            </div>
                                        }

                                    </div>
                                </div>
                            )
                    })
                    :
                    <div>
                    </div>
                }
            </div>
            <div className={style.post_chat_input}>
                <input className={style.input} placeholder='댓글 달기...' onChange={onChangeChat}/>
                <div className={style.submit} onClick={onSubmit}>게시</div>
            </div>
        </ReactModal>
    );
};

export default PostChat;