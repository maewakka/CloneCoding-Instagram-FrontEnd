import React, {useEffect, useState} from 'react';
import style from './Search.module.css';
import withJwtAxios from "../../components/axios/withJwtAxios";
import PostRender from "../home/PostRender";
const Search = () => {
    const [input, setInput] = useState("");
    const [postList, setPostList] = useState();
    const [postIndex, setPostIndex] = useState([]); // 게시글의 파일 순서에 대한 처리를 위한 배열
    const [chatIsOpen, setChatIsOpen] = useState([]); // 게시글 댓글 모달 창 처리를 위한 배열

    const onChange = (e) => {
        setInput(e.target.value);
    }

    const onKeyPress = (e) => {
        if(e.key == 'Enter') {
            submit();
        }
    }

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

    const submit = () => {
        withJwtAxios.get("/posts/search", {params: {query: input}})
            .then((res) => {
                setPostList(res.data.postList);
                setPostIndex(new Array(res.data.postList.length).fill(0));
                setChatIsOpen(new Array(res.data.postList.length).fill(false));
            })
    }

    const setLike = (postId) => {
        withJwtAxios.get("/like", {params: {postId: postId}})
            .then((res) => {
                withJwtAxios.get("/posts/search", {params: {query: input}})
                    .then((res) => {
                        setPostList(res.data.postList);
                    })
            });
    }

    const deleteLike = (postId) => {
        withJwtAxios.delete("/like", {params: {postId: postId}})
            .then((res) => {
                withJwtAxios.get("/posts/search", {params: {query: input}})
                    .then((res) => {
                        setPostList(res.data.postList);
                    })
            });
    }

    useEffect(() => {
        if(input != '') {
            withJwtAxios.get("/posts/search", {params: {query: input}})
                .then((res) => {
                    setPostList(res.data.postList);
                });
        }
    }, [chatIsOpen])

    return (
        <div className={style.container}>
            <div className={style.header}>
                <input className={style.input} value={input} onChange={onChange} onKeyPress={onKeyPress}/>
                <i className="bi bi-search fs-3" style={{cursor: 'pointer'}} onClick={submit}></i>
            </div>
            <div className={style.body}>
                {postList != undefined ?
                    <PostRender postList={postList} setPostList={setPostList} postIndex={postIndex} chatIsOpen={chatIsOpen} setChatIsOpen={setChatIsOpen}
                                onClickLeft={onClickLeft} onClickRight={onClickRight} setLike={setLike} deleteLike={deleteLike}/>
                : <> </>}
            </div>
        </div>
    );
};

export default Search;
