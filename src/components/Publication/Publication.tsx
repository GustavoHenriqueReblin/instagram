import './publication.scss';
import Story from '../Story/Story';
import Likes from '../../pages/Likes/Likes';
import CommentContainer from '../CommentContainer/CommentContainer';
import BottomModal from '../BottomModal/BottomModal';
import { Like, Publication as PublicationType, TypeOfPublication, User } from '../../types/types';
import { formatLongData, FormatNumberToString } from '../../Helper';
import { DESLIKE, LIKE } from '../../graphql/mutations/publication';

import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import { HiOutlineSave } from "react-icons/hi";
import { useMutation } from '@apollo/client';

interface PublicationProps {
    data: PublicationType;
    userLogged: User | null;
};

function Publication({ data, userLogged }: PublicationProps) {
    const [ isDescriptinExpanded, setIsDescriptinExpanded ] = useState<Boolean>(false);
    const [ myLike, setMyLike ] = useState<Like | undefined>(data.likes.find(like => like.userId === userLogged?.id));
    const [ hasAds ] = useState(data.type === TypeOfPublication.ADVERTISEMENT);
    const [ postLikes, setPostLikes ] = useState<Like[]>(data.likes);
    const [ isLikesModalOpen, setIsLikesModalOpen ] = useState<Boolean>(false);
    const [ isCommentModalOpen, setIsCommentModalOpen ] = useState<Boolean>(false);

    const [ addLike ] = useMutation(LIKE);
    const [ removeLike ] = useMutation(DESLIKE);

    // Depois mudar
    const hasLocation = false;
    const locationName = '';

    const changeLike = async () => {
        if (!!myLike) {
            const likeId = myLike?.id;
            const newPostLikes = postLikes.filter(like => like.id !== myLike?.id);
            setPostLikes(newPostLikes);
            setMyLike(undefined);
            
            await removeLike({
                variables: {
                    input: {
                        id: likeId,
                    },
                },
            })
            .catch((error) => {
                console.error('Erro ao remover o like: ', error);
                setPostLikes([...postLikes, myLike]);
                setMyLike(myLike);
            });
        } else {
            addLike({
                variables: {
                    input: {
                        id: "-1",
                        publicationId: data.id,
                        userId: userLogged?.id
                    },
                },
            })
            .then((res) => {
                setPostLikes([...postLikes, res.data.addPublicationLike]);
                setMyLike(res.data.addPublicationLike as Like);
            })
            .catch((error) => {
                console.error('Erro ao registrar o like: ', error);
                setMyLike(undefined);
            });
        }
    };

    return (
        <>
            <div className='publi-container'>
                <div className='publi-header'>
                    <Story fromPubli={ true } />
                    <div className='user-info'>
                        <span className='username'>{ data.username }</span>
                        { hasAds && (<span className='location'>{ 'Patrocinado' }</span>)}
                        { hasLocation && (<span className='location'>{ locationName }</span>)}
                    </div>
                    <div className='options'><SlOptionsVertical /></div>
                </div>

                <div className='content'>
                    { data.type === TypeOfPublication.IMAGE && <img className='image' src={ data.fileUrl } alt=""/> }
                </div> 

                <div className='icons'>
                    <span className='publi-icon' onClick={() => {changeLike()}}>
                        { !!myLike 
                        ? (<svg className='like' fill="currentColor" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>)
                        : (<FaRegHeart />)} 
                    </span>
                    <span className='publi-icon' onClick={() => setIsCommentModalOpen(true)}><MdOutlineModeComment /></span>
                    <div className='grow-1'>
                        <span className='publi-icon'><LuSend /></span>
                    </div>
                    <span className='publi-icon last'><HiOutlineSave /></span>
                </div>

                <div className='options-container'>
                    <div className='likes' onClick={() => {setIsLikesModalOpen(true)}}>
                        { FormatNumberToString(postLikes.length, 'curtida', 'curtidas', 'Nenhuma curtida') } 
                    </div>
                    <div className={`description ${isDescriptinExpanded ? 'expanded': ''}`}>
                        <span className='user'>{ data.username } </span>
                            { data.description }
                        { !isDescriptinExpanded && data.description && data.description?.length > 30 && (
                            <div className='show-more' 
                                onClick={() => setIsDescriptinExpanded(true)}>
                                mais
                            </div>
                        )}
                    </div>
                    { data.comments && data.comments.length > 0 && (
                        <div className='all-comments' onClick={() => setIsCommentModalOpen(true)}>
                            Ver { data.comments.length > 1 ? ' todos os ' + data.comments.length + ' comentários' : 'comentário' } 
                        </div>
                    )}
                    {/* <div className='preview-comment'> </div> */}
                    <div className='publi-time'>
                        { formatLongData(data.dateTime) }
                    </div>
                </div>
            </div>

            { isLikesModalOpen && <Likes views={data?.views} data={postLikes} closePage={() => setIsLikesModalOpen(false)} /> }
            { isCommentModalOpen && 
                <BottomModal closeModal={() => setIsCommentModalOpen(false)} 
                content={ <CommentContainer 
                    imagesContent={ data.type === TypeOfPublication.IMAGE ? <img className='image' src={ data.fileUrl } alt=""/> : <></> }
                    usernameOwner={ data.username } 
                    data={ data.comments } 
                />} 
            /> }
        </>
    );
}

export default Publication;