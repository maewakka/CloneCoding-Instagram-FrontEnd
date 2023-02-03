import React, {useEffect, useState} from 'react';
import style from './Post.module.css';
import PostFile from "./PostFile";
import PostWrite from "./PostWrite";
import multiFileAxios from "../../components/axios/multiFileAxios";
import {useNavigate} from "react-router-dom";

const PostContainer = () => {

    const navigate = useNavigate();

    /* 게시글 변경 */
    const [write, setWrite] = useState();
    const onChangeWrite = (e) => {
        setWrite(e.target.value);
    }

    /* 게시물 파일 변경 */
    const [files, setFiles] = useState();
    // let files = useRef();
    const [fileNum, setFileNum] = useState(0);

    const onChangeFiles = (inputs) => {
        setFiles(inputs);
    };

    const fileNumInc = () => {
        if(fileNum < files.length-1) {
            setFileNum(fileNum => {
                return fileNum + 1;
            });
        }
    }

    const fileNumDec = () => {
        if(fileNum > 0) {
            setFileNum(fileNum => {
                return fileNum - 1;
            });
        }
    }

    const onSubmit = () => {
        if(files === undefined | files === '') {
            alert("사진을 선택하세요");
            return;
        }

        console.log(write);

        const formData = new FormData();
        const size = files.length;

        for(let i=0; i<size; i++) {
            formData.append("file", files[i]);
        }
        formData.append("content", JSON.stringify(write));

        multiFileAxios.post('/post', formData)
            .then((response) => {
                alert(response.data);
                navigate("/outstagram/home");
            });
    }

    useEffect(() => {

    }, [files])

    return (
        <div className={style.post_container}>
            <div className={style.post_header_container}>
                <div/>
                <div>
                    새 게시물 만들기
                </div>
                <div className={style.submit} onClick={onSubmit}>
                    공유하기
                </div>
            </div>
            <div className={style.post_body_container}>
                <PostFile files={files} fileNum={fileNum} fileNumInc={fileNumInc} fileNumDec={fileNumDec} onChangeFiles={onChangeFiles}/>
                <PostWrite onChangeWrite={onChangeWrite}/>
            </div>
        </div>
    );
};

export default PostContainer;