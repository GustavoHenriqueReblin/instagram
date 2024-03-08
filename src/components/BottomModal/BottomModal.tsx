import './bottomModal.scss';
import React from "react";
import { useMediaQuery } from '@uidotdev/usehooks';
import Comment from '../Comment/Comment';

interface BottomModalProps {
    closeModal: () => void;
};

function BottomModal({ closeModal }: BottomModalProps) {
    const desktopScreen = useMediaQuery('(min-width: 796px)');
    const validateClick = (e: any) => {
        e.target.className === 'comments-modal-container' && closeModal();
    };

    return (
        <div className='comments-modal-container' onClick={(e) => validateClick(e)}>
            <div className='comments-content'>
                { !desktopScreen && 
                    <div className='comments-header'>
                        <div className='comment-title-container'>
                            <span>Comentários</span>
                        </div>
                    </div> 
                }
                <div className="comment-modal-content">
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
            </div>
        </div>
    )
}

export default BottomModal;