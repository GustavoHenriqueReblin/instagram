import './publication.scss';
import Story from '../Story/Story';

import React from "react";
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
};

function Publication({ hasAds, hasLocation, username, locationName }: PublicationProps) {
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
                <span className='publi-icon grow-1'><LuSend /></span>
                <span className='publi-icon last'><HiOutlineSave /></span>
            </div>

            <div className='comments-container'>
                <div className='likes'>
                    1.657 curtidas
                </div>
                <div className='description'><span className='user'>torettodragrace</span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad mollitia voluptatem quibusdam sunt deserunt cupiditate maiores tenetur modi, dolore ducimus repellat nihil aliquam voluptas, placeat consequatur unde. Sapiente aliquid, molestias blanditiis libero soluta laboriosam assumenda! Suscipit in fugiat quis quasi, quos sequi hic libero dolores iusto cupiditate saepe voluptatem assumenda tenetur dignissimos! Illum vitae soluta velit, corporis laboriosam dolorem totam officia nisi eligendi commodi?
                    <span className='show-more'>mais</span>
                </div>
                <div className='all-comments'>
                    Ver todos os 263 comentários
                </div>
                {/* <div className='preview-comment'>

                </div> */}
                <div className='publi-time'>
                    24 de fevereiro
                </div>
            </div>
        </div>
    )
}

export default Publication;