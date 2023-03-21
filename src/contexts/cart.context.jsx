import { createContext, useEffect, useState } from "react";

//helper function
const addCartItem = (cartItems, productToAdd) => {
  //return the item has same id as the one to add
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  
  //if found, 不是在现有array element里修改数量，而是return a new element with the spread out and updated quantity field
  if(existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
    );
  }
  //no existing cartItem found, return new array with item added
  return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCheckoutItem = (cartItems, itemToRemove) => {
  //find cart item to remove 
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);

  //check if quantity is 1, then remove the item
  if (existingCartItem.quantity === 1) {
     return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
  }

  //return cart item with reduced quantity
  return cartItems.map((cartItem) => 
      cartItem.id === itemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    );
};

const clearItem = (cartItems, itemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0,
  setCartCount: () => {},
  removeItemFromCart: () => {},
  clearCartItem: () => {},
}); 

export const CartProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  //check cartItems，决定是create new item or add quantity to existing item
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd)) //setter func里call另一个helper func
  };

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(removeCheckoutItem(cartItems, itemToRemove))
  }

  const clearCartItem = (itemToClear) => {
    setCartItems(clearItem(cartItems, itemToClear))
  }

  //用useEffect，每次cartItems变化的时候，trigger reduce function
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => 
      total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems])

  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearCartItem, cartTotal}; //include the function in the value

  return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
};