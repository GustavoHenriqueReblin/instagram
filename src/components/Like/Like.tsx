import './like.scss';
import React from "react";
import { Like as LikeType } from '../../types/types';
import Story from '../Story/Story';

interface LikeProps {
    data?: LikeType;
};

function Like({ data }: LikeProps) {
    return (
        <div className="like-row">
            <div className='like-image'>
                <Story fromComment={ true } />
            </div>
            <div className='names'>
                <span>{ data?.username }</span>
                <span className='name'>{ data?.name }</span>
            </div>
            <button className='follow-like-button'>Seguir</button>
        </div>
    )
}

export default Like;