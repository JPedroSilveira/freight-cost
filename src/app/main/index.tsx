import React, { useState } from 'react'
import CostInfo from '../../components/cost/cost_info'
import Header from '../../components/header'
import PathSelector from '../../components/path/path_selector'
import City from '../../types/City'
import { CityService } from '../../services/'
import ResultDialog from '../../components/path/result_dialog'
import './styles.css'

const Main: React.FC = () => {
    const [resultOpen, setResultOpen] = useState(false)
    const [selectedCities, setSelectecCities] = useState<City[]>()

    const handleCalcPath = (cities: City[]) => {
        setSelectecCities(cities)
        setResultOpen(true)
    }

    const handleResultClose = () => {
        setResultOpen(false)
        setSelectecCities([])
    }

    return (
        <div className='main'>
            <Header />
            <div className='main--body'>
                <CostInfo />
                <PathSelector cityService={CityService} onCalcPath={handleCalcPath}/>
            </div>
            <ResultDialog 
                cities={selectedCities}
                open={resultOpen}
                onClose={handleResultClose}
            />
        </div>
    )
}

export default Main