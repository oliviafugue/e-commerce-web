import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import '../authentication/authentication.styles.scss'

const Authentication = () => {
    // useEffect(() => {
    //     async function redirect() {
    //         const response = await getRedirectResult(auth); //auth相当于一个bank，存着所有authentication instance info
    //         console.log(response);}
    //         redirect()}
    //         , []) //给一个空array means component第一次mount的时候运行里面的callback func

    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;