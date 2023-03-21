import { useContext, useEffect } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckOutItem from '../../components/checkout-item/checkout-item.componet';

import './checkout.styles.scss';


const CheckOut = () => {

    const { cartItems, setIsCartOpen, cartTotal } = useContext(CartContext);

    useEffect(() => {
        setIsCartOpen(false);
    }, [])

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((item) => 
                <CheckOutItem key={item.id} item={item}/>)
            }
            <span className='total'>TOTAL: ${cartTotal}</span>
        </div>
    )};

export default CheckOut;