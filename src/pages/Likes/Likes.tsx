import './likes.scss';
import { Like as LikeType } from '../../types/types';
import Input from '../../components/Input/Input';
import Like from '../../components/Like/Like';
import { FormatNumberToString } from '../../Helper';

import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { BsPlay } from "react-icons/bs";

interface LikesProps {
    data?: LikeType[];
    views: number;
    closePage: () => void;
};

function Likes({ data, views, closePage }: LikesProps) {
    const desktopScreen = useMediaQuery('(min-width: 796px)');
    const validateClick = (e: any) => {
        desktopScreen && e.target.className === 'likes-container' && closePage();
    };

    return (
        <div className='likes-container' onClick={(e) => validateClick(e)}>
            <div className='likes-content'>
                <div className='likes-header'>
                    { !desktopScreen && ( 
                        <span onClick={() => closePage()} className='likes-icon'><IoMdArrowRoundBack /></span> 
                    )}
                    <span className='title'>Curtidas</span>
                    { desktopScreen && ( 
                        <span onClick={() => closePage()} className='likes-icon'><IoClose /></span> 
                    )}
                </div>
                
                {!desktopScreen && <div className='likes-input'><Input /></div>}

                <span className='views'>
                    <span className='view-icon'>
                        <BsPlay />
                    </span>
                    <>{ FormatNumberToString(views, 'reprodução', 'reproduções', 'Nenhuma reprodução') }</>
                </span>

                <div className='liked-by-container'>
                    <span className='liked-by'>CURTIDO POR</span>
                    <span className='likes-count'>{FormatNumberToString(data?.length, 'curtida', 'curtidas', 'Nenhuma curtida') }</span>
                </div>

                <div className='line'></div>
                
                <div className='likes'>
                    { data && data.length > 0
                        ? data.map((like: LikeType) => (
                            <Like key={like.id} data={like} />
                        ))
                        : (<span className='no-more-content'>Nenhuma curtida</span>) 
                    }
                </div>
            </div>
        </div>
    )
}

export default Likes;