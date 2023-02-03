import React from 'react';
import style from "./PostFile.module.css";
import {Static_Base_Url} from "../../index";

const PostFile = (props) => {
    const postFileList = props.postFileList;
    const idx = props.idx;
    const postIndex = props.postIndex;
    const onClickLeft = props.onClickLeft;
    const onClickRight = props.onClickRight;

    // 파일이 동영상인지, 이미지인지 판단하여 다르게 랜더링한다.
    const fileRender = (url) => {
        const extension = url.split('/').pop().split('.').pop();

        if(['mp4', 'mov', 'avi', 'wmv', 'MP4', 'MOV', 'AVI', 'WMV'].includes(extension)) {
            return(
                <video className={style.post_file} src={url} controls />
            )
        } else {
            return(
                <img className={style.post_file} src={url} />
            )
        }
    }

    return (
        <div className={style.post_file_container}>
            <div className={style.post_file_arrow_left} onClick={() => onClickLeft(idx)} style={{display: postIndex[idx] === 0 ? 'none' : 'inherit'}}>
                <i className="bi bi-arrow-left-circle"></i>
            </div>
            {fileRender(Static_Base_Url + postFileList[postIndex[idx]].fileUrl)}
            <div className={style.post_file_arrow_right} onClick={() => onClickRight(idx)} style={{display: postIndex[idx] === postFileList.length-1 ? 'none' : 'inherit'}}>
                <i className="bi bi-arrow-right-circle"></i>
            </div>
        </div>
    );
};

export default PostFile;