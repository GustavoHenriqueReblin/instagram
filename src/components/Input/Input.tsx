import './input.scss';

import React from "react";
import { IoSearch } from "react-icons/io5";

function Input() {
    return (
        <div className='input-container'>
            <span className='search-icon'><IoSearch /></span>
            <input type="text" placeholder='Pesquisar' className='input'></input>
        </div>
    )
}

export default Input;