// function Button ({type, id, text, onClick, theme}){
function Button ({type, id, text, theme, disabled, onClick, classList, btnStyle}){
    
    const scheme = btnStyle ? btnStyle : 'default'

    let classes = "btn py-2 btn-" + scheme

    if (theme === 'primary'){
        classes = classes + ' border-primary border-2 bg-primary-lighter text-primary-darkest '
    } else if (theme === 'secondary'){
        classes = classes + ' border-secondary-darker border-2 bg-secondary-lighter text-secondary-darkest '
    } else if (theme === 'none'){
        classes = ''
    } else {
        classes = classes + ' border-warning border-2 '        
    }

    return (
        <button
            className={classes + classList}
            type={type}
            name={id}
            id={id}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button