import './like.scss';
import React from "react";

function Like() {
    return (
        <div className="like-row">
            <div className='like-image'></div>
            <div className='names'>
                <span>ogustavohique</span>
                <span className='name'>Gustavo</span>
            </div>
            <button className='follow-like-button'>Seguir</button>
        </div>
    )
}

export default Like;