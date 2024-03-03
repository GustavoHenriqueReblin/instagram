import './header.scss';
import React from "react";

import { FaRegHeart } from "react-icons/fa";
import { PiMessengerLogoBold } from "react-icons/pi";

function Header() {
    return (
        <div className='header'>
            <h2 className='logo'>Instagram</h2>
            <span className='icon'><FaRegHeart />
                <div className='notification'></div>
            </span>
            <span className='icon'><PiMessengerLogoBold />
                <div className='message-notification'>1</div>
            </span>
        </div>
    )
}

export default Header;