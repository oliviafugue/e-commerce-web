import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {

    const {isCartOpen, setIsCartOpen} = useContext(CartContext)

    const handleClick = () => {
        isCartOpen ? setIsCartOpen(false) : setIsCartOpen(true)
    }

    return(
        <div className='cart-icon-container' onClick={handleClick}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    )
}


export default CartIcon; 
