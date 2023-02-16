import React, {useEffect, useRef, useState} from 'react';
import style from "./ChatRoom.module.css";
import withJwtAxios from "../../components/axios/withJwtAxios";
import * as SockJs from 'sockjs-client';
import {useSelector} from "react-redux";
import {Static_Base_Url} from "../../index";
import Stomp from 'stompjs';

const ChatRoom = (props) => {

    const chatRoomId = props.chatRoom;
    const targetEmail = props.targetEmail;
    const [inputs, setInputs] = useState("");
    const [chatting, setChatting] = useState();
    const [chatList, setChatList] = useState();
    const userDetail = useSelector(state => state.userDetail);
    const stomp = useRef({});
    const sock = new SockJs("http://localhost:8080/api/socket");

    stomp.current = Stomp.over(sock);
    const headers = {
        'Authorization': localStorage.getItem("accessToken")
    }

    const onSubmit = () => {
        let value = JSON.stringify(inputs);
        value = value.slice(1, value.length-1)

        if(value) {
            const data = {
                chatRoomId: chatRoomId,
                message: inputs
            }
            withJwtAxios.post("/chats/chat", data)
                .then((res) => {
                    setChatList(res.data.chatList);
                });

            stomp.current.send("/publish/messages", headers, JSON.stringify({
                message: inputs,
                senderEmail: userDetail.email,
                receiverEmail: targetEmail,
                chatRoomId: chatRoomId
            }), (res) => {
                console.log(res.data.body);
            })

            setInputs("");
        }
    }

    const onKeyPress = (e) => {
        if(e.key == 'Enter') {
            onSubmit();
        }
    }

    useEffect(() => {
        if(chatRoomId != undefined) {
            withJwtAxios.get("/chats/chat-list", {params: {chatRoomId: chatRoomId}})
                .then((res) => {
                    setChatList(res.data.chatList);
                })

            stomp.current.connect(headers, () => {
                stomp.current.subscribe('/subscribe/rooms/' + chatRoomId,  (res) => {
                    const obj = JSON.parse(res.body)
                    // console.log(obj)
                    setChatting({
                        email: obj.email,
                        nickname: obj.nickname,
                        profileUrl: obj.profileUrl,
                        content: obj.content
                    })
                }, headers)
            });
        }
    }, [chatRoomId])

    useEffect(() => {
        if(chatList != undefined) {
            let tmp = [...chatList];
            tmp.push(chatting);
            setChatList(tmp);
        }
    }, [chatting])

    const onChange = (e) => {
        setInputs(e.target.value);
    }

    return (
        <>
            <div className={style.chat_body_container}>
                <div>
                    {chatList != undefined ? chatList.map((chat, idx) => {
                        if(chat.email === userDetail.email) {
                            return(
                                <div key={idx} className={style.my_chat}>
                                    <div className={style.my_chat_box}>
                                        {chat.content}
                                    </div>
                                </div>
                            )
                        } else {
                            if(idx > 0) {
                                return(
                                    <div key={idx} className={style.oppo_chat}>
                                        {chatList[idx-1].email !== chat.email ?
                                            <img className={style.thumbnail} src={Static_Base_Url + chat.profileUrl} /> :
                                            <div className={style.thumbnail_blank}></div>}
                                        <div className={style.oppo_chat_box}>
                                            {chat.content}
                                        </div>
                                    </div>
                                )
                            } else {
                                return(
                                    <div key={idx} className={style.oppo_chat}>
                                        <img className={style.thumbnail} src={Static_Base_Url + chat.profileUrl} />
                                        <div className={style.oppo_chat_box}>
                                            {chat.content}
                                        </div>
                                    </div>
                                    )
                            }

                        }


                        }) :
                    <div></div>
                    }
                </div>
            </div>
            <div className={style.input_container}>
                <input className={style.input} value={inputs} onChange={onChange} onKeyPress={onKeyPress}/>
                <button className='btn btn-outline-primary' onClick={onSubmit}>보내기</button>
            </div>

        </>
    );
};

export default ChatRoom;