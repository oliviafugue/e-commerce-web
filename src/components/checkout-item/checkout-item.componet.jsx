import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss'

const CheckOutItem = ({item}) => {

    const { addItemToCart, removeItemFromCart, clearCartItem } = useContext(CartContext);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={item.imageUrl} alt={`${item.name}`} />
            </div>
            <span className='name'>{item.name}</span>
            <div className='quantity'>
                <span className='arrow' onClick={() => removeItemFromCart(item)}>&#10094;</span>
                <span className='value'>{item.quantity}</span>
                <span className='arrow' onClick={() => addItemToCart(item)}>&#10095;</span>
            </div>
            <span className='price'>{item.price}</span>
            <span className='remove-button' onClick={() => clearCartItem(item)}>&#10005;</span>
        </div>       
    );
};

export default CheckOutItem;