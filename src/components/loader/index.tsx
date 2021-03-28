import React from 'react'
import LoaderGif from '../../assets/loader.svg'
import AppConstants from '../../constants/AppConstants'
import './styles.css'

const Loader: React.FC<{
    isLoading: boolean
}> = ({
    isLoading,
    children
}) => {
    return (
        <div className='loader'>
            {isLoading && 
                <div className='loader-image-container'>
                    <img src={LoaderGif} alt={AppConstants.LOAD_ALT} />
                </div>
            }
            {children}
        </div>

    )
}

export default Loader