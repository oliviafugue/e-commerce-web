import React from 'react';
import CategoryList from "../category-list/category-list";
import CategoryItem from "../category-item/category-item.component"
import './directory.styles.scss'

const Directory = () => {
    return (
        <div className='directory-container'>
            {CategoryList.map((category) => (  
                 <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    )
}

export default Directory;

