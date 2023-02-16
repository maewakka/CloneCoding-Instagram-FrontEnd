import React, {useEffect, useState} from 'react';
import withJwtAxios from "../../components/axios/withJwtAxios";
import PostRender from "./PostRender";
import style from './PostRender.module.css';

const HomeContainer = () => {

    const [postList, setPostList] = useState(); // 게시글 리스트
    const [postIndex, setPostIndex] = useState(); // 게시글의 파일 순서에 대한 처리를 위한 배열
    const [chatIsOpen, setChatIsOpen] = useState(); // 게시글 댓글 모달 창 처리를 위한 배열

    useEffect(() => {
        withJwtAxios.get('/post-list')
            .then((res) => {
                setPostList(res.data.postList);
                setPostIndex(new Array(res.data.postList.length).fill(0));
                setChatIsOpen(new Array(res.data.postList.length).fill(false));
            });
    }, [])

    useEffect(() => {
        withJwtAxios.get('/post-list')
            .then((res) => {
                setPostList(res.data.postList);
            });
    }, [chatIsOpen])

    // 왼쪽 버튼을 눌렸을 때, 파일의 인덱스를 1 감소시킨다.
    const onClickLeft = (idx) => {
        if(postIndex[idx] > 0) {
            const temp = JSON.parse(JSON.stringify(postIndex));
            temp[idx] -= 1
            setPostIndex(temp);
        }
    }
    // 왼쪽 버튼을 눌렸을 때, 파일의 인덱스를 1 증가시킨다.
    const onClickRight = (idx) => {
        const postFileLen = postList[idx].postFileList.length;
        if(postIndex[idx] < postFileLen -1) {
            const temp = JSON.parse(JSON.stringify(postIndex));
            temp[idx] += 1
            setPostIndex(temp);
        }
    }

    const setLike = (postId) => {
        withJwtAxios.get("/like", {params: {postId: postId}})
            .then((res) => {
                setPostList(res.data.postList);
            });
    }

    const deleteLike = (postId) => {
        withJwtAxios.delete("/like", {params: {postId: postId}})
            .then((res) => {
                setPostList(res.data.postList);
            });
    }

    return (
        <div className={style.home_container}>
            <PostRender postList={postList} setPostList={setPostList} postIndex={postIndex} chatIsOpen={chatIsOpen} setChatIsOpen={setChatIsOpen}
                        onClickLeft={onClickLeft} onClickRight={onClickRight} setLike={setLike} deleteLike={deleteLike}/>
        </div>
    );
};

export default HomeContainer;