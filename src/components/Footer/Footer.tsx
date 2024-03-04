import './footer.scss';
import React from "react";

import { GoHomeFill, GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaSquarePlus, FaRegSquarePlus } from "react-icons/fa6";
import { BiSolidMoviePlay, BiMoviePlay } from "react-icons/bi";
import { PiFilmSlateBold } from "react-icons/pi";

function Footer() {
    return (
        <div className='footer'>
            <div className='icon'><GoHomeFill /></div>
            <div className='icon'><IoSearch /></div>
            <div className='icon'><FaRegSquarePlus /></div>
            <div className='icon'><PiFilmSlateBold /></div>
            <div className='icon'><div className='profile'></div></div>
        </div>
    )
}

export default Footer;