import './story.scss';
import React from "react";

interface StoryProps {
    myStory?: boolean | undefined;
    username?: string | undefined;
    fromPubli?: boolean | undefined;
    fromComment?: boolean | undefined;
};

function Story({ myStory, username, fromPubli, fromComment }: StoryProps) {
    return (
        <>
            <div className={`story-content 
                ${ fromPubli ? 'fromPubli' : ''} 
                ${ fromComment ? 'fromComment' : ''}
            `}>
                <div className={`story-border 
                    ${ myStory ? 'my-story' : ''} 
                    ${ fromPubli ? 'fromPubli' : ''} 
                    ${ fromComment ? 'fromComment' : ''}
                `}>
                    <div className={`story 
                        ${ myStory ? 'my-story' : ''} 
                        ${ fromComment ? 'fromComment' : ''}
                    `}></div>
                    { myStory  && ( <div className='plus'>+</div> )}
                </div>
                
                <span className={`username 
                    ${ fromPubli ? 'fromPubli' : ''} 
                    ${ fromComment ? 'fromComment' : ''}
                `}>{ username }</span>
            </div>
        </>
    )
}

export default Story;