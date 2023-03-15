import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
}); 

export const CartProvider = (props) => {
    const [isCartOpen, setIsCartOpen] = useState();
    const value = {isCartOpen, setIsCartOpen};

    return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
};