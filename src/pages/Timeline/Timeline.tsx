import './timeline.scss';
import React from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Timeline() {
    const navigate = useNavigate();

    const cookieName = process.env.REACT_APP_COOKIE_NAME_USER_TOKEN;
    if (cookieName) {
        const userToken = Cookies.get(cookieName);
        !userToken && navigate('/login');
    }

    return (
        <span>Timeline</span>
    )
}

export default Timeline;