import './timeline.scss';
import LoadingMeta from '../../components/LoadingMeta/LoadingMeta';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import React, { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Story from '../../components/Story/Story';
import Publication from '../../components/Publication/Publication';

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
                            <Publication 
                                username={'osforasteirosdefaraway'} 
                                hasAds={ true } 
                                comments={[{ id: 1, description: 'Olá' }]}
                                description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad mollitia voluptatem quibusdam sunt deserunt cupiditate maiores tenetur modi, dolore ducimus repellat nihil aliquam voluptas, placeat consequatur unde. Sapiente aliquid, molestias blanditiis libero soluta laboriosam assumenda! Suscipit in fugiat quis quasi, quos sequi hic libero dolores iusto cupiditate saepe voluptatem assumenda tenetur dignissimos! Illum vitae soluta velit, corporis laboriosam dolorem totam officia nisi eligendi commodi?'}
                                date={'24 de fevereiro'}
                            />
                            <Publication 
                                username={'lekobertoldo'} 
                                hasLocation={ true } 
                                locationName={ 'Witmarsum' }
                                likes={1}
                                comments={[{ id: 1, description: 'Olá' }, { id: 2, description: 'Olá2' }]}
                                description={''}
                                date={'31 de janeiro'}
                            />
                            <Publication 
                                username={'lekobertoldo'} 
                                likes={5621}
                                comments={[{}]}
                                description={'Lorem ipsum dolor sit amet consectetur'}
                                date={'01 de dezembro'}
                            />
                            <Publication username={'ogustavohique'} date={'04 de novembro'} />
                        </div>
                    </div>

                    <Footer />
                </main>
            )}
        </>
    )
}

export default Timeline;