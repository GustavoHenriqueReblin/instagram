import './timeline.scss';
import LoadingMeta from '../../components/LoadingMeta/LoadingMeta';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import React, { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Story from '../../components/Story/Story';

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
                    <Header />

                    <div className='middle-content'>
                        <div className='story-container'>
                            <div className='space'>.</div>
                            <Story myStory={true} username={'Seu story'} />
                            <Story username={'joazinhooooooo'}/>
                            <div className='space'>.</div>
                        </div>

                        <div className='main-content'>
                            {/*<div className='teste'></div>
                            <div className='teste'></div>
                            <div className='teste'></div>
                            <div className='teste'></div>*/}


                        </div>
                    </div>

                    <Footer />
                </main>
            )}
        </>
    )
}

export default Timeline;