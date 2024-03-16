import './comment.scss';
import React, { useState } from "react";

import { FaRegHeart } from "react-icons/fa";
import Story from '../Story/Story';
import { Comment as CommentType, CommentReply as CommentReplyType} from '../../types/types';
import { getTimeAgo } from '../../Helper';

interface CommentProps {
    data?: CommentType | CommentReplyType;
};

function Comment({ data }: CommentProps) {
    const isAComment = data && 'publicationId' in data;

    return (
        <>
            <div className={`comment-content ${isAComment ? '' : 'reply'}`}>
                <div>
                    <Story fromComment={true} />
                </div>
                <div className='user-comment'>
                    <div className='username'>
                        <span>{ data?.username }</span>
                        <span className='time-ago'>{ getTimeAgo(data?.dateTime) }</span>
                    </div>
                    <div className='content'><span>{ data?.description }</span></div>
                    <div className='reply-translate-container'>
                        <div className='reply-translate-content'>
                            <span className='reply'>Responder</span>
                            <span className='translate'>Ver tradução</span>
                        </div>
                    </div>
                </div>
                <div className='like'>
                    <span className='heart'><FaRegHeart /></span>
                    <span className='like-count'>{ 19 }</span>
                </div>
            </div>
        </>
    )
}

export default Comment;