import React from 'react'
import CostInfo from '../../components/cost/cost_info'
import Header from '../../components/header'

const Main: React.FC = () => {
    return (
        <div className='main'>
            <Header />
            <CostInfo />
        </div>
    )
}

export default Main