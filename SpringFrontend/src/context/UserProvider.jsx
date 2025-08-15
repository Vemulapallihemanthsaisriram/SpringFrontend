import { useState } from "react"
import { createContext } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);

    const userIsLoggedIn = () => {
        const token = localStorage.getItem('userToken');
        if(token) return true;
        return false;
    }

    const loginUser = (token) => {
        setUserToken(token);
        localStorage.setItem('userToken', token);
    }

    const logoutUser = () => {
        localStorage.removeItem('userToken');
        setUserToken(null);
        setUser(null);
    }

    const getToken = () => {
        return localStorage.getItem('userToken');
    }

    const getUser = () => {
        return user;
    }


    return (
        <UserContext.Provider value={{ loginUser, logoutUser, getToken, userIsLoggedIn, getUser }}>
            { children }
        </UserContext.Provider>
    )
}