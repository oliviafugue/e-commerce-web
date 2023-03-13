import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utilities/firebase/firebase";

//create a context variable - store value, set an intial value - 内容是下面useState需要的两个param
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

//SomeContext.provider - context provider is the actual component to use inside index.js, wrap components that need to use the value of the context provider; work together with useState
export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser }; 

    //auth stage change - user login or logout
    //实现component mount时initialize listener to the auth state, 之后每次auth state change都会triger这个listener，然后运行里面的callback func
    useEffect(() => {
        const callback = (user) => {
            if (user) {
                createUserDocumentFromAuth(user); //firebase.jsx里有check if user exists；这里是用来取代之前散落在sign-in-form里的给Google signin user create doc的功能，集中到context file里
            }
            setCurrentUser(user);
        }
        return onAuthStateChangedListener(callback);
    }, [])

    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}