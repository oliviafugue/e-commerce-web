import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utilities/firebase/firebase';
import FormInput from '../form-input/form-input.components';
import '../sign-up-form/sign-up-form.styles.scss'
import Button from '../button/button.component'


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Password does not match.'); 
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName}) //function defined in firebase.jsx, import and use here to create user doc based on input filed data; two param: userauth, additionalInfo
            resetFormFields();
            
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use.')
            }
            console.log('cannot create user', error.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target; //name = event.target.name; value = event.target.value
        setFormFields({ ...formFields, [name]: value }); //...formFields: get all current filds, then update only the change filed
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName} />

                <FormInput label='Email' input type='email' required onChange={handleChange} name='email' value={email} />

                <FormInput label='Password' input type='password' required onChange={handleChange} name='password' value={password} />

                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;