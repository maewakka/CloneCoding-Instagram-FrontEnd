import React from 'react';
import style from './PostRender.module.css';
import {Static_Base_Url} from "../../index";
import PostFile from "./PostFile";
const PostRender = (props) => {
    const postList = props.postList;
    const postIndex = props.postIndex;
    const onClickLeft = props.onClickLeft;
    const onClickRight = props.onClickRight;

    return (
        <>
            {postList !== undefined?
                postList.map((post, idx) => {
                    const user = post.user;
                    const postFileList = post.postFileList;

                    return(
                        <div key={idx} className={style.post_container}>
                            {/* 게시글의 윗 부분의 디자인 -> 프로필 사진과 닉네임, 그리고 추가적인 메뉴들을 구성 */}
                            <div className={style.post_header}>
                                <div className={style.post_header_profile}>
                                    <img className={style.profile_thumbnail} src={Static_Base_Url + user.profileUrl}/>
                                    <div>{user.nickname}</div>
                                </div>
                                <div className={style.post_header_menu}>
                                    <i className="bi bi-three-dots fs-3"></i>
                                </div>
                            </div>

                            {/* 게시글의 컨텐츠를 보여주는 부분 */}
                            <PostFile postFileList={postFileList} postFileList={postFileList} idx={idx} postIndex={postIndex} onClickLeft={onClickLeft} onClickRight={onClickRight}/>

                            {/* 게시글의 좋아요, 댓글들을 보여주는 부분 */}
                            <div className={style.post_icon_container}>
                                <div className={style.post_icon}>
                                    <i className='bi bi-suit-heart fs-3'/>
                                    <i className='bi bi-chat fs-3' style={{marginLeft: '10px'}}/>
                                </div>
                                <div className={style.post_icon_num}>
                                    <div style={{marginRight: '10px'}}>
                                        좋아요 갯수  ,
                                    </div>
                                    <div>
                                        댓글 갯수
                                    </div>
                                </div>
                            </div>

                            {/* 게시글의 글을 보여주는 부분 */}
                            <div className={style.post_content_container}>
                                <div className={style.post_content_nickname}>
                                    {user.nickname}
                                </div>
                                <div className={style.post_content}>
                                    {post.content.slice(1, post.content.length-1)}
                                </div>
                            </div>
                        </div>
                    )
                })
            :
                <div>게시글이 없습니다.</div>
            }
        </>
    );
};

export default PostRender;