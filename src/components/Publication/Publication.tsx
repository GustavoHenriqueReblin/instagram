import './publication.scss';
import Story from '../Story/Story';
import { Like, Publication as PublicationType, TypeOfPublication } from '../../types/types';
import { formatLongData } from '../../Helper';

import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import { HiOutlineSave } from "react-icons/hi";
import { useMutation } from '@apollo/client';
import { DESLIKE, LIKE } from '../../graphql/mutations/publication';

interface PublicationProps {
    data: PublicationType;
    userIdLogged: number | undefined;
};

function Publication({ data, userIdLogged }: PublicationProps) {
    const [ isDescriptinExpanded, setIsDescriptinExpanded ] = useState(false);
    const [ myLike, setMyLike ] = useState<Like | undefined>(data.likes.find(like => like.userId === userIdLogged));
    const [ hasAds ] = useState(data.type === TypeOfPublication.ADVERTISEMENT);

    const [ addLike ] = useMutation(LIKE);
    const [ removeLike ] = useMutation(DESLIKE);

    // Depois mudar
    const hasLocation = false;
    const locationName = '';

    const getLikesString = () => {
        if (data.likes) {
            const newLikeValue = data.likes.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            if (data.likes.length > 1) {
                return newLikeValue + ' curtidas';
            } else {
                return newLikeValue + ' curtida';
            }
        } else {
            return 'Nenhuma curtida';
        }
    };

    const changeLike = async () => {
        if (!!myLike) {
            await removeLike({
                variables: {
                    input: {
                        id: myLike?.id,
                    },
                },
            })
            .catch((error) => console.error('Erro ao remover o like: ', error));
            setMyLike(undefined);
        } else {
            addLike({
                variables: {
                    input: {
                        id: "-1",
                        publicationId: data.id,
                        userId: userIdLogged
                    },
                },
            })
            .then((res) => setMyLike(res.data.addPublicationLike as Like))
            .catch((error) => {
                console.error('Erro ao registrar o like: ', error);
                setMyLike(undefined);
            });
        }
    };

    return (
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
                    : (<FaRegHeart />) } 
                </span>
                <span className='publi-icon'><MdOutlineModeComment /></span>
                <div className='grow-1'>
                    <span className='publi-icon'><LuSend /></span>
                </div>
                <span className='publi-icon last'><HiOutlineSave /></span>
            </div>

            <div className='comments-container'>
                <div className='likes'>
                    { getLikesString() } 
                </div>
                <div className={`description ${isDescriptinExpanded ? 'expanded': ''}`}>
                    <span className='user'>{ data.username }</span>
                        { data.description }
                    { !isDescriptinExpanded && data.description && data.description?.length > 30 &&
                        (<span className='show-more' onClick={() => setIsDescriptinExpanded(true)}>mais</span>)
                    }
                </div>
                { data.comments && data.comments.length > 0 && (
                    <div className='all-comments'>
                        Ver { data.comments.length > 1 ? ' todos os ' + data.comments.length + ' comentários' : 'comentário' } 
                    </div>
                )}
                {/* <div className='preview-comment'> </div> */}
                <div className='publi-time'>
                    { formatLongData(data.dateTime) }
                </div>
            </div>
        </div>
    )
}

export default Publication;