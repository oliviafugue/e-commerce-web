/*
Three types of buttons in whole web app:
default, inverted, Google sign in
*/

import '../button/button.styles.scss'

const BUTTON_TYPE_CLASS = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

// ...otherProps - spread all other attrbutes given when use this Button component
const Button = ({children, buttonType, ...otherProps}) => {
    return <button className={`button-container ${BUTTON_TYPE_CLASS[buttonType]}`} {...otherProps}>{children}</button>
}

export default Button;