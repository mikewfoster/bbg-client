function InputText ({name, placeholder, value, onChange, onFocus, error, disabled, readonly}) {
    return (
        <div className="mb-3">
            <label htmlFor={name} id={name + "Label"} className="form-label fw-500 text-primary-darker">{placeholder}</label>
            <input
                type="text"
                className={"form-control bg-light border-primary-lighter border-2 " + (error.length ? 'is-invalid' : '')}
                id={name}
                name={name}
                aria-describedby=""
                placeholder={placeholder}
                defaultValue={value}
                onChange={onChange}
                onFocus={onFocus}
                autoComplete="off"
                disabled={disabled}
                readOnly={readonly}
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

export default InputText