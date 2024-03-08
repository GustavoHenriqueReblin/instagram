import './comment.scss';
import React, { useState } from "react";

import { FaRegHeart } from "react-icons/fa";
import Story from '../Story/Story';
import { useMediaQuery } from '@uidotdev/usehooks';

function Comment() {
    const desktopScreen = useMediaQuery('(min-width: 796px)');
    const [ myLike, setMyLike ] = useState(true);

    return (
        <div className='comment'>
            { !desktopScreen && (
                <>
                    <div className="comment-photo">
                        <Story fromComment={ true } />
                    </div>
                    <div className="comment-info">
                        <div className='user-row'>
                            <span className='comment-username'>username</span>
                            <span className='comment-hour'>4h</span>
                        </div>
                        <span>Conteúdo do comentário</span>
                        <div className='reply-row'>
                            <span className='reply-item'>Responder</span>
                            <span className='reply-item'>Ver tradução</span>
                        </div>
                        <span className='more-comments'>Ver mais 2 respostas</span>
                    </div>
                    <span className="comment-like">
                        { !myLike 
                        ? (<svg className='like' fill="currentColor" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>)
                        : (<FaRegHeart />) }
                        {/* <span className='like-count'>1</span> */}
                    </span>
                </>
            )}
        </div>
    )
}

export default Comment;