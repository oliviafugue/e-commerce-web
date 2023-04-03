import { createContext, useState, useEffect } from 'react';

// import { addCollectionAndDocuments } from '../utilities/firebase/firebase';
import { getCategoriesAndDocuments } from '../utilities/firebase/firebase';
import SHOP_DATA from '../shop-data'; //json里是一个array,这里assign a variable name to use

//create new context
export const CategoriesContext = createContext({
    categoriesMap: {},
})

//context provider
export const CategoriesProvider = (props) => {
    //useState to assign json value to context
    const [categoriesMap, setCategoriesMap] = useState({});

    // 只需要add一次data to firbase; 一般不会在front end做这事儿
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoryMap = async () =>{ //在useEffect里不能直接call async, 一个新的function, 里面await utility function
            const categoryMap = await getCategoriesAndDocuments(); 
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }

        getCategoryMap();
    }, [])



    const value = { categoriesMap }; //state和setState必须成对使用？

    return <CategoriesContext.Provider value={value}>{props.children}</CategoriesContext.Provider>
}  