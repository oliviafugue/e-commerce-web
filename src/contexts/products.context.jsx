import { createContext, useState } from 'react';
import PRODUCTS from '../shop-data.json'; //json里是一个array,这里assign a variable name to use

//create new context
export const ProductsContext = createContext({
    products: [],
    setProducts: () => null,
})

//context provider
export const ProductsProvider = (props) => {
    //useState to assign json value to context
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products, setProducts }; //state和setState必须成对使用？

    return <ProductsContext.Provider value={value}>{props.children}</ProductsContext.Provider>
} 