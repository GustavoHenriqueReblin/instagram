import './publication.scss';
import Story from '../Story/Story';

import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import { HiOutlineSave } from "react-icons/hi";

interface PublicationProps {
    hasAds?: boolean | undefined;
    hasLocation?: boolean | undefined;
    username?: string | undefined;
    locationName?: string | undefined;
    likes?: number | undefined;
    comments?: any | undefined;
    description?: string | undefined;
    date?: string | undefined;
};

function Publication({ 
    hasAds, hasLocation, username, locationName, likes, comments, description, date
}: PublicationProps) {
    const [isDescriptinExpanded, setIsDescriptinExpanded] = useState(false);

    const getLikesString = () => {
        if (likes) {
            const newLikeValue = likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            if (likes > 1) {
                return newLikeValue + ' curtidas';
            } else {
                return newLikeValue + ' curtida';
            }
        } else {
            return 'Nenhuma curtida';
        }
    };

    return (
        <div className='publi-container'>
            <div className='publi-header'>
                <Story fromPubli={ true } />
                <div className='user-info'>
                    <span className='username'>{ username }</span>
                    { hasAds && (<span className='location'>{ 'Patrocinado' }</span>)}
                    { hasLocation && (<span className='location'>{ locationName }</span>)}
                </div>
                <div className='options'><SlOptionsVertical /></div>
            </div>

            <div className='content'></div>

            <div className='icons'>
                <span className='publi-icon'><FaRegHeart /></span>
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
                    <span className='user'>{ username }</span>
                        { description }
                    { !isDescriptinExpanded && description && description?.length > 30 &&
                        (<span className='show-more' onClick={() => setIsDescriptinExpanded(true)}>mais</span>)
                    }
                </div>
                { comments && comments.length > 0 && (
                    <div className='all-comments'>
                        Ver { comments.length > 1 ? ' todos os ' + comments.length + ' comentários' : 'comentário' } 
                    </div>
                )}
                {/* <div className='preview-comment'>

                </div> */}
                <div className='publi-time'>
                    { date }
                </div>
            </div>
        </div>
    )
}

export default Publication;