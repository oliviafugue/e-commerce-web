import { createContext, useState } from "react";

//create a context variable - store value, set an intial value - 内容是下面useState需要的两个param
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


//SomeContext.provider - context provider is the actual component to use inside index.js, wrap components that need to use the value of the context provider; work together with useState
export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser }; 

    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}