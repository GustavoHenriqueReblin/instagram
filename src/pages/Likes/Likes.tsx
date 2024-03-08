import './likes.scss';
import { Like as LikeType } from '../../types/types';
import Input from '../../components/Input/Input';
import Like from '../../components/Like/Like';

import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { BsPlay } from "react-icons/bs";

interface LikesProps {
    data?: LikeType[];
    closePage: () => void;
};

function Likes({ data, closePage }: LikesProps) {
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

                {desktopScreen && (
                    <span className='views'>
                        <span className='view-icon'>
                            <BsPlay />
                        </span>
                        116.856 reproduções
                    </span>
                )}

                {desktopScreen && (
                    <div className='liked-by-container'>
                        <span className='liked-by'>CURTIDO POR</span>
                        <span className='likes-count'>3.920 curtidas</span>
                    </div>
                )}

                <div className='line'></div>
                
                <div className='likes'>
                    <Like />
                    <Like />
                    <Like />
                    <Like />
                    <Like />
                    <Like />
                    <Like />
                    <Like />
                    <Like />
                    <Like />
                    <Like />
                    <Like />
                    <Like />
                    <Like />
                </div>
            </div>
        </div>
    )
}

export default Likes;