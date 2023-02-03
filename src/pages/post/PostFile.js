import React, {useEffect, useState} from 'react';
import style from './PostFile.module.css'
const PostFile = (props) => {
    const files = props.files;
    const fileNum = props.fileNum;
    const onChangeFiles = props.onChangeFiles;
    const fileNumInc = props.fileNumInc;
    const fileNumDec = props.fileNumDec;

    const [thumbFile, setThumbFile] = useState({src: '', type: ''});
    const setThumbnail = (file) => {
        const reader = new FileReader()
        const type = file.type.split('/')[0];

        if(type === 'image') {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setThumbFile(() => {return {src: reader.result, type: type};});
            }
        }
        if(type === 'video') {
            const videoUrl = URL.createObjectURL(file);
            setThumbFile(() => {return {src: videoUrl, type: type};});
        }
    }

    useEffect(() => {
        if(files != undefined) {
            setThumbnail(files[fileNum]);
        }
    }, [fileNum, files])

    return (
        <div className={style.post_file_container}>
            {files === undefined ?
                <>
                    <label className={style.selector} htmlFor='file'>
                        <i className="bi bi-images fs-1"></i>
                        <div style={{fontSize: '20px', marginTop:'10px', fontWeight:'bold'}}>
                            사진을 선택하세요
                        </div>
                    </label>
                    <input type='file' id='file' accept='image/*, video/*' onChange={(e) => onChangeFiles(e.target.files)} style={{display:'none'}} multiple/>
                </>
                :
                <div className={style.thumbnail_container}>
                    <i className="bi bi-arrow-left-circle-fill" onClick={fileNumDec}/>
                    {thumbFile.type === 'image' ?
                        <img className={style.thumbnail} src={thumbFile.src} /> :
                        <video className={style.thumbnail} controls src={thumbFile.src}>
                        </video>
                    }
                    <i className="bi bi-arrow-right-circle-fill"  onClick={fileNumInc}/>
                </div>
            }
        </div>
    );
};

export default PostFile;