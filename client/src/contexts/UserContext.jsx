import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});


export const UserContextProvider = ({ children }) => {

    let [user, setUser] = useState(null)
    let [isAuthReady, setIsAuthReady] = useState(false)

    useEffect(() => {
        if (!user) {
            axios.get('/me').then((res) => {
                setUser(res.data);
            }).then(() => {
                setIsAuthReady(true)
            })
        } else {
            setIsAuthReady(true)
        }
    }, [])
    return <UserContext.Provider value={{ user, setUser, isAuthReady }}>
        {children}
    </UserContext.Provider>
}