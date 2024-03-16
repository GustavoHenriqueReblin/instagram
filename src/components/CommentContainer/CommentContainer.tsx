import './commentContainer.scss';
import Comment from '../Comment/Comment';
import { Comment as CommentType } from '../../types/types';
import { FormatNumberToString } from '../../Helper';

import React, { useState } from "react";
import { useMediaQuery } from '@uidotdev/usehooks';
import Story from '../Story/Story';
import Input from '../Input/Input';

interface CommentContainerProps {
    usernameOwner: string;
    imagesContent: React.JSX.Element;
    data?: CommentType[];
};

function CommentContainer({ usernameOwner, imagesContent, data }: CommentContainerProps) {
    const desktopScreen = useMediaQuery('(min-width: 796px)');
    const [ commentsIdsAreShowingReplies, setCommentsIdsAreShowingReplies ] = useState<number[]>([] as number[]);

    const updateVisibleReplies = (id: number) => {
        const oldCommentsIds = commentsIdsAreShowingReplies;
        setCommentsIdsAreShowingReplies([...oldCommentsIds, id]);
    };

    return (
        <div className='comment-container'>
            { !desktopScreen && 
                <div className='comments-header'>
                    <div className='comment-title-container'>
                        <span>Comentários</span>
                    </div>
                </div> 
            }
            { desktopScreen && (
                <div className='photo-comment-container'>
                    { imagesContent }
                </div>
            )}
            <div className='comment-content-area'>
                { desktopScreen && <div className='user-owner'>
                    <Story fromPubli={ true } />
                    <span>{ usernameOwner }</span>
                </div> }
                <div className='comment-scrollable-content'>
                    { data && data.map((comment) => (
                        <>
                            <Comment key={ comment.id } data={ comment } />
                            { !commentsIdsAreShowingReplies.includes(comment.id) && comment.commentsReply.length > 0 &&
                                <div className='show-replies-area' >
                                    <span className='show-replies' onClick={() => updateVisibleReplies(comment.id)}>{
                                        FormatNumberToString (
                                            comment.commentsReply.length,
                                            'Ver mais 1 comentário',
                                            'Ver mais ' + comment.commentsReply.length + ' comentários',
                                            '', 
                                            false
                                        )}
                                    </span>
                                </div>
                            }
                            { commentsIdsAreShowingReplies.includes(comment.id) && comment.commentsReply && comment.commentsReply.map((commentReply) => (
                                <Comment key={ commentReply.id } data={ commentReply } />
                            ))}
                        </>
                    ))}
                </div>
                <div className='comment-input-area'>
                    <div className='user-photo-profile'></div>
                    <Input placeholder='Adicione um comentário...' inputClass='input large' />
                    <div className='publish-button-area'><span className='publish-button'>Publicar</span></div>
                </div>
            </div>
        </div>
    )
}

export default CommentContainer;