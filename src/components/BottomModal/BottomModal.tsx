import './bottomModal.scss';
import React from "react";

interface BottomModalProps {
    closeModal: () => void;
    content: React.JSX.Element;
};

function BottomModal({ closeModal, content }: BottomModalProps) {
    const validateClick = (e: any) => {
        e.target.className === 'comments-modal-container' && closeModal();
    };

    return (
        <div className='comments-modal-container' onClick={(e) => validateClick(e)}>
            <div className='comments-content'>
                { content }
            </div>
        </div>
    )
}

export default BottomModal;