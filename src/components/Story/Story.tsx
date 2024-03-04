import './story.scss';
import React from "react";

interface StoryProps {
    myStory?: boolean;
    username: string;
};

function Story({ myStory, username }: StoryProps) {
    return (
        <>
            <div className='story-content'>
                <div className={`story-border ${ myStory && 'my-story'}`}>
                    <div className={`story ${ myStory && 'my-story'}`}></div>
                    { myStory  && ( <div className='plus'>+</div> )}
                </div>
                
                <span className={`username ${ myStory && 'mt-2'}`}>{ username }</span>
            </div>
        </>
    )
}

export default Story;