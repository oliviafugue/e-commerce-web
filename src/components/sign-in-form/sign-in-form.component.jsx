import { useLayoutEffect, useState } from 'react';
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utilities/firebase/firebase';
import FormInput from '../form-input/form-input.components';
import '../sign-in-form/sign-in-form.styles.scss'
import Button from '../button/button.component'


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const response = await signInWithGooglePopup();
        await createUserDocumentFromAuth(response.user)    
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetFormFields();  
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user found with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target; //name = event.target.name; value = event.target.value
        setFormFields({ ...formFields, [name]: value }); //...formFields: get all current filds, then update only the change filed
    };


    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />

                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />
                <div className='buttons-container'>
                    <Button type='submit'>SIGN IN</Button>
                    {/*form里的button默认是submit type，下面的google signin需要手动给一个button type*/}
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>
                
            </form>
        </div>
    );
};

export default SignInForm;