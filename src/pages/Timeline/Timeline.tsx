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
            setLoading(false);
        },
        onError: (err) => {
            console.error(err);
            setLoading(false);
        } 
    });

    useEffect(() => {
        user && getPublications({ variables: { input: { userId: user.id } } });
    }, [user, getPublications]);

    const cookieName = process.env.REACT_APP_COOKIE_NAME_USER_TOKEN;
    if (cookieName) {
        const userToken = Cookies.get(cookieName);
        !userToken && navigate('/login');
    };

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
                            { publicationData.publications.data && publicationData.publications.data.map((publication: PublicationType) => (
                                <Publication 
                                    key={ publication.id }
                                    username={ publication.username }
                                    hasAds={ false } // Mudar depois
                                    hasLocation={ false } // Mudar depois
                                    locationName={''} // Mudar depois
                                    likes={ publication.likes.length }
                                    comments={ publication.comments }
                                    description={ publication.description }
                                    date={ publication.dateTime }
                                />
                            ))}
                        </div>
                    </div>

                    <Footer />
                </main>
            )}
        </>
    )
}

export default Timeline;