import React, { createContext, useContext } from "react";
import { User } from "../types/types";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { FindOneByToken } from "../graphql/queries/user";

interface AuthContextProps {
    user: User | null;
};

interface AuthProviderProps {
    children: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps>({
    user: {} as User,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const cookieUserName = process.env.REACT_APP_COOKIE_NAME_USER_TOKEN;
    const userToken = Cookies.get(cookieUserName ? cookieUserName : '');  

    const { data } = useQuery(FindOneByToken, {
        variables: { input: { token: userToken } },
    });

    if (data?.getUserByToken?.data?.length <= 0) {
        cookieUserName && Cookies.remove(cookieUserName);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user: data?.getUserByToken?.data as User }}>
            { children }
        </AuthContext.Provider>
    );
};
  
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};