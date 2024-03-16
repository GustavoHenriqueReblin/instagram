import './timeline.scss';
import LoadingMeta from '../../components/LoadingMeta/LoadingMeta';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Publication from '../../components/Publication/Publication';
import Story from '../../components/Story/Story';
import { Publication as PublicationType } from '../../types/types';
import { useAuthContext } from '../../contexts/userContext';
import { FindMany } from '../../graphql/queries/publication';

import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

function Timeline() {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const { user } = useAuthContext();
    
    const [getPublications, { data: publicationData }] = useLazyQuery(FindMany, {
        onCompleted: (res) => {
            loading && setTimeout(() => {
                setLoading(false);
            }, Math.floor(Math.random() * (2200 - 1000 + 1)) + 1000);
        },
        onError: (err) => {
            console.error(err);
            setLoading(false);
        } 
    });

    useEffect(() => {
        const cookieName = process.env.REACT_APP_COOKIE_NAME_USER_TOKEN;
        if (cookieName) {
            const userToken = Cookies.get(cookieName);
            !userToken && navigate('/login', { replace: true });
        };

        user && getPublications({ variables: { input: { userId: user.id } } });
    }, [user, getPublications]);

    return (
        <>
            { loading ? (<LoadingMeta></LoadingMeta>) : (
                <main className='timeline'>
                    <NavBar />

                    <div className='middle-content'>
                        <Header />
                        <div className='story-container'>
                            <div className='space'>.</div>
                            <Story myStory={true} username={'Seu story'} />
                            <Story username={'joazinhooooooo'}/>
                            <Story username={'onça'}/>
                            <Story username={'jaguara'}/>
                            <Story username={'pedrinho'}/>
                            <div className='space'>.</div>
                        </div>

                        <div className='main-content'>
                            { publicationData.publications.data && publicationData.publications.data.length > 0
                                ? 
                                publicationData.publications.data.map((publication: PublicationType) => (
                                    <Publication 
                                        key={ publication.id }
                                        data={ publication }
                                        userLogged={ user }
                                    />
                                ))
                                : (<span className='no-more-content'>Nada de novo por aqui... 🥺</span>) 
                            }
                        </div>
                    </div>

                    <Footer />
                </main>
            )}
        </>
    )
}

export default Timeline;