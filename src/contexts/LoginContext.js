import { createContext, useState } from 'react';

export const LoginContext = createContext();

export default function LoginContextProvider(props) {
    const [loginData, setLoginData] = useState({
        token: '',
        username: ''
    })
    return (
        <LoginContext.Provider value={[loginData, setLoginData]}>
            {props.children}
        </LoginContext.Provider>
    )

}