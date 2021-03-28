import React from 'react'
import CostInfo from '../../components/cost/cost_info'
import Header from '../../components/header'
import PathSelector from '../../components/path_selector'
import City from '../../types/City'
import { CityService } from '../../services/'
import './styles.css'

const Main: React.FC = () => {
    const handleCalcPath = (path: City[]) => {
        console.log("calcule")
    }

    return (
        <div className='main'>
            <Header />
            <div className='main--body'>
                <CostInfo />
                <PathSelector cityService={CityService} onCalcPath={handleCalcPath}/>
            </div>
        </div>
    )
}

export default Main