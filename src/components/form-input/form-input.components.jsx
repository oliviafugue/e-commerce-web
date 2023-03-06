import '../form-input/form-input.styles.scss';

// ...inputOptions - spread all other attributes when use this component
// label className - when there is a input value, use the 'shrink' class
const FormInput = ({label, ...inputOptions }) => {
    return (
        <div className='group'>
            <input className='form-input' {...inputOptions}></input>
            {label && (
            <label className={`${inputOptions.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
        </div>
    )
}

export default FormInput;
 