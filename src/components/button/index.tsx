import React from 'react'
import MaterialButton from '@material-ui/core/Button'
import './styles.css'

const Button: React.FC<{
    onClick: () => void
    variant?: "text" | "outlined" | "contained"
}> = ({
    onClick,
    children,
    variant
}) => {
    return (
        <MaterialButton
            onClick={onClick}
            className='button'
            variant={variant}
            color="primary"
        >
            {children}
        </MaterialButton>
    )
}

export default Button