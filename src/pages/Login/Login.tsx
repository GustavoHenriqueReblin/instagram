import './login.scss';
import { FindOne } from '../../graphql/queries/user';

import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyQuery } from '@apollo/client';
import { FaFacebookSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const loginUserFormSchema = z.object({
    email: z.string().min(1, 'O e-mail é obrigatório!').email('E-mail inválido!'),
    password: z.string().min(1, 'A senha é obrigatória!'),
});

interface LoginFormData {
    email: string;
    password: string;
};

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginUserFormSchema),
    });
    const [queryErrors, setQueryErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [ findOneUser ] = useLazyQuery(FindOne);
    const navigate = useNavigate();

    const validateLogin = (data: LoginFormData) => {
        const { email, password } = data;
        setQueryErrors(null);
        findOneUser({
            variables: { input: { email: email, password: password } },
        })
        .then((res) => {
            const data = res?.data?.user?.data;
            if (data && data != null && data.length > 0) {
                const token = data[0].token;
                const cookieName = process.env.REACT_APP_COOKIE_NAME_USER_TOKEN;
                if (cookieName) {
                    Cookies.set(cookieName, token, { expires: 1 });
                    navigate('/', { replace: true });
                }
            }
            data.error && setQueryErrors(data.error);
        })
        .catch((error) => {
            console.error("Erro ao buscar o usuário: ", error);
        });
    };

    useEffect(() => {
        const cookieName = process.env.REACT_APP_COOKIE_NAME_USER_TOKEN;
        if (cookieName) {
            const userToken = Cookies.get(cookieName);
            userToken && navigate('/', { replace: true });
        };
    });

    loading && setLoading(false);

    return (
        <>
            { loading ? (<Loading title=''></Loading>) 
            : (
                <main className='main'>
                    <form className='login-card' onSubmit={handleSubmit(validateLogin)}>
                        <span className='logo'>Instagram</span>
                        <input
                            className='input'
                            type="text"
                            aria-label="email input"
                            placeholder="E-mail"
                            {...register('email')}
                        />
                        {errors.email && <span className='error-input'>{errors.email.message}</span>}
                        <input
                            className='input'
                            type="current-password"
                            aria-label="password input"
                            placeholder="Senha"
                            {...register('password')}
                        />
                        {errors.password && <span className='error-input'>{errors.password.message}</span>}
                        {queryErrors !== null && <span className='error-input'>{queryErrors}</span>}
                        <button className='button' type="submit">Entrar</button>

                        <div className='separator'>
                            <span className='scratch'></span>
                            <span className='or'> OU </span>
                            <span className='scratch'></span>
                        </div>

                        <div className='fb'>
                            <span className='fb-icon'><FaFacebookSquare /></span>
                            Entrar com facebook
                        </div>

                        <div className='forgot'>Esqueceu a senha?</div>
                    </form>
                    <div className='register-card'>
                        <span className='no-account'>Não tem uma conta? <span className='register'>Cadastre-te.</span></span>
                    </div>
                </main>
            )}
        </>
    )
}

export default Login;