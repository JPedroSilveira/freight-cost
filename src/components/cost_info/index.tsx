import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Loader from '../loader'
import { CostService } from '../../services'
import { toast } from 'react-toastify'
import AppConstants from '../../constants/AppConstants'
import Cost from '../../types/Cost'
import StringUtils from '../../utils/StringUtils'
import CostConstants from '../../constants/CostConstants'
import Button from '@material-ui/core/Button'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'

const DEFAULT_VALUE = 'R$ 0,00'

const CostInfo: React.FC = () => {
    const [isLoading, setLoading] = useState(true)
    const [value, setValue] = useState(DEFAULT_VALUE)

    useEffect(() => {
        const loadData = async () => {
            const cost = await CostService.get()
            setData(cost)
        }

        let setData = (cost: Cost | false | undefined) => {
            if (cost === false) {
                toast(AppConstants.ERROR_LOADING_DATA)
                return
            }
            
            if (cost === undefined) {
                setValue(DEFAULT_VALUE)
            } else  {
                setValue(StringUtils.numberToReais(cost.value))
            }

            setLoading(false)
        }

        loadData()

        return () => {
            setData = () => {}
        }
    }, [value])

    return (
        <Paper className='cost' elevation={3}>
            <Loader isLoading={isLoading}>
                <h2 className='cost-value'> 
                    <span>{`${CostConstants.COST_INFO_TEXT}: `}</span>
                    <span>{value}</span>
                </h2>
                <Button className='cost-button' variant="contained" color="primary">
                    {CostConstants.COST_BUTTON_TEXT}
                </Button>
            </Loader>
        </Paper>
    )
}

export default CostInfo