import './navBar.scss';
import React from "react";

import { GoHomeFill, GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { BiSolidMoviePlay, BiMoviePlay } from "react-icons/bi";
import { PiMessengerLogoFill, PiMessengerLogoLight } from "react-icons/pi";
import { FaHeart, FaRegHeart, FaInstagram } from "react-icons/fa";
import { FaSquarePlus, FaRegSquarePlus } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

function NavBar() {
    return (
        <div className='navbar'>
            <h2 className='logo'>Instagram</h2>
            <ul className='links'>
                <li className='item'>
                    <span className='icon'><GoHome /></span>
                    <span className='item-text'>Página Inicial</span>
                </li>
                <li className='item'>
                    <span className='icon'><IoSearch /></span>
                    <span className='item-text'>Pesquisa</span>
                </li>
                <li className='item'>
                    <span className='icon'><MdOutlineExplore /></span>
                    <span className='item-text'>Explorar</span>
                </li>
                <li className='item'>
                    <span className='icon'><BiMoviePlay /></span>
                    <span className='item-text'>Reels</span>
                </li>
                <li className='item'>
                    <span className='icon'><PiMessengerLogoLight /></span>
                    <span className='item-text'>Mensagens</span>
                </li>
                <li className='item'>
                    <span className='icon'><FaRegHeart /></span>
                    <span className='item-text'>Notificações</span>
                </li>
                <li className='item hide-on-small-screen'>
                    <span className='icon'><FaRegSquarePlus /></span>
                    <span className='item-text'>Criar</span>
                </li>
                <li className='item'>
                    <div className='profile'></div>
                    <span className='item-text'>Perfil</span>
                </li>
                <li className='item fixed hide-on-small-screen'>
                    <span className='icon'><IoMenu /></span>
                    <span className='item-text'>Mais</span>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;