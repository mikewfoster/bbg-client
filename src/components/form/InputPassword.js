function InputPassword ({name, placeholder, value, onChange, onFocus, error}){
    return (
        <div className="mb-3">
            <label htmlFor={name} id={name + "Label"} className="form-label fw-500 text-primary-darker">{placeholder}</label>
            <input
                type="password"
                className={"form-control bg-light border-primary-lighter border-2 " + (error.length ? 'is-invalid' : '')}
                id={name}
                name={name}
                aria-describedby=""
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                autoComplete="off"
            />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            {error.length ?
                <div className="invalid-feedback">
                    { error }
                </div>
            : '' }
        </div>
    )
}

export default InputPassword