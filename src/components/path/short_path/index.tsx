import React from 'react'
import ShortPathType from '../../../types/ShortPath'
import LogoSVG from '../../../assets/logo.svg' 
import './styles.css'
import StringUtils from '../../../utils/StringUtils'

const ShortPath: React.FC<{
    shortPath: ShortPathType
    key?: React.Key
}> = ({
    shortPath,
    key
}) => {
    return (
        <div className='short-path' key={key}>
            <img src={LogoSVG} />
            <div className='short-path--data'>
                <p>De: {shortPath.originCity}</p>
                <p>Para: {shortPath.destinyCity}</p>
                <p>Distância: {StringUtils.numberToMoneyString(shortPath.distance)}km</p>
            </div>
        </div>
    )
}

export default ShortPath