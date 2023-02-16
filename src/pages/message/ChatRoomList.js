import React, {useEffect, useState} from 'react';
import style from './ChatRoomList.module.css'
import withJwtAxios from "../../components/axios/withJwtAxios";
import ChatRoom from "./ChatRoom";
import {Static_Base_Url} from "../../index";

const ChatRoomList = () => {

    const [chatRoomList, setChatRoomList] = useState();
    const [chatRoom, setChatRoom] = useState();
    const [targetEmail, setTargetEmail] = useState();
    const [clickState, setClickState] = useState();

    const onChatRoom = (idx) => {
        setChatRoom(chatRoomList[idx].chatRoomId);
    }
    const onClickChatRoom = (idx) => {
        withJwtAxios.get("/chats/create", {params: {target: chatRoomList[idx].email}})
            .then((res) => {
                let list = res.data.chatRoomList;

                setChatRoomList(list);
                setChatRoom(list[idx].chatRoomId)
                setTargetEmail(list[idx].email)
            })

        let len = clickState.length;
        let temp = new Array(len).fill(false);
        temp[idx] = true;
        setClickState(temp);
    }

    useEffect(() => {
        withJwtAxios.get("/chats/user-list")
            .then((res) => {
                setChatRoomList(res.data.chatRoomList);
                setClickState(new Array(res.data.chatRoomList.length).fill(false));
            });
    }, [])

    return (
        <div className={style.container}>
            <div className={style.chat_room_list_container}>
                {chatRoomList != undefined ?
                    chatRoomList.map((chat, idx) => {
                        return(
                            <div key={idx} className={style.list_container} onClick={() => onClickChatRoom(idx)} style={clickState[idx] ? {backgroundColor: '#dadada'} : {backgroundColor: 'white'}}>
                                <img src={Static_Base_Url + chat.profileUrl} className={style.thumbnail}/>
                                <div className={style.content}>
                                    <div className={style.nickname}>{chat.nickname}</div>
                                    {clickState[idx] ? <></> : <div className={style.last_message}>{chat.lastMessage}</div>}
                                </div>
                            </div>
                        )
                    })
                    :
                    <div></div>
                }
            </div>
            <div className={style.chat_room_container}>
                <ChatRoom chatRoomList={chatRoomList} chatRoom={chatRoom} targetEmail={targetEmail}/>
            </div>
        </div>

    );
};

export default ChatRoomList;