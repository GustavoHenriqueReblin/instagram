import './story.scss';
import React from "react";

interface StoryProps {
    myStory?: boolean;
};

function Story({ myStory }: StoryProps) {
    return (
        <>
            <div className='story-content'>
                { myStory ? (
                    <>
                        <div className='story'></div>
                        <div className='plus'>+</div>
                    </>
                ) : (
                    <div className='story-border'>
                        <div className='story'></div>
                    </div>
                )}
                
                <span className='username'>Seu story</span>
            </div>
        </>
    )
}

export default Story;