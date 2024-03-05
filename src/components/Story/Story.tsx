import './story.scss';
import React from "react";

interface StoryProps {
    myStory?: boolean | undefined;
    username?: string | undefined;
    fromPubli?: boolean | undefined;
};

function Story({ myStory, username, fromPubli }: StoryProps) {
    return (
        <>
            <div className={`story-content ${ fromPubli ? 'fromPubli' : ''}`}>
                <div className={`story-border ${ myStory ? 'my-story' : ''}`}>
                    <div className={`story ${ myStory ? 'my-story' : ''}`}></div>
                    { myStory  && ( <div className='plus'>+</div> )}
                </div>
                
                <span className={`username ${ myStory ? 'mt-2' : ''}`}>{ username }</span>
            </div>
        </>
    )
}

export default Story;