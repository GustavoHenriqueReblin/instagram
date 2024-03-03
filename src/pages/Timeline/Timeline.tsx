import './timeline.scss';
import React, { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import LoadingMeta from '../../components/LoadingMeta/LoadingMeta';
import NavBar from '../../components/NavBar/NavBar';

function Timeline() {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const cookieName = process.env.REACT_APP_COOKIE_NAME_USER_TOKEN;
    if (cookieName) {
        const userToken = Cookies.get(cookieName);
        !userToken && navigate('/login');
    };

    loading && setTimeout(() => {
        setLoading(false);
    }, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000);

    return (
        <>
            { loading ? (<LoadingMeta></LoadingMeta>) : (
                <main className='timeline'>
                    <NavBar />
                </main>
            )}
        </>
    )
}

export default Timeline;