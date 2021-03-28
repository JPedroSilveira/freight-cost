import React from 'react'
import CostInfo from '../../components/cost/cost_info'
import Header from '../../components/header'
import './styles.css'

const Main: React.FC = () => {
    return (
        <div className='main'>
            <Header />
            <div className='main--body'>
                <CostInfo />
            </div>
        </div>
    )
}

export default Main