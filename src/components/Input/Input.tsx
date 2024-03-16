import './input.scss';
import React from "react";

interface InputProps {
    icon?: any;
    placeholder: string;
    inputClass: string;
};

function Input({ icon, placeholder, inputClass }: InputProps) {
    return (
        <div className='input-container'>
            { icon && (<span className='search-icon'>{ icon }</span>) }
            <input type="text" placeholder={ placeholder } className={ inputClass }></input>
        </div>
    )
}

export default Input;