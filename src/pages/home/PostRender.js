import React from 'react';
import style from './PostRender.module.css';
import {Static_Base_Url} from "../../index";
import PostFile from "./PostFile";
import PostChat from "./PostChat";
const PostRender = (props) => {
    const postList = props.postList;
    const setPostList = props.setPostList;
    const postIndex = props.postIndex;
    const onClickLeft = props.onClickLeft;
    const onClickRight = props.onClickRight;
    const chatIsOpen = props.chatIsOpen;
    const setChatIsOpen = props.setChatIsOpen;
    const setLike = props.setLike;
    const deleteLike = props.deleteLike;

    const onClickChat = (idx) => {
        const temp = JSON.parse(JSON.stringify(chatIsOpen));
        temp[idx] = true
        setChatIsOpen(temp);
    }

    const onClickExitChat = (idx) => {
        const temp = JSON.parse(JSON.stringify(chatIsOpen));
        temp[idx] = false;
        setChatIsOpen(temp);
    }

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
                                    {
                                        !post.like ?
                                            <i className='bi bi-suit-heart fs-3' style={{cursor: 'pointer'}} onClick={() => setLike(post.postId)}/>:
                                            <i className='bi bi-suit-heart-fill fs-3' style={{cursor: 'pointer'}} onClick={() => deleteLike(post.postId)} style={{color: 'red'}}/>
                                    }
                                    <i className='bi bi-chat fs-3' style={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => onClickChat(idx)}/>
                                    <PostChat isOpen={chatIsOpen[idx]} chatIsOpen={chatIsOpen} onClickExitChat={onClickExitChat} idx={idx} postId={post.postId}/>
                                </div>
                                <div className={style.post_icon_num}>
                                    <div style={{marginRight: '10px'}}>
                                        좋아요 {post.countLike}개 ,
                                    </div>
                                    <div>
                                        댓글 {post.countChat}개
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