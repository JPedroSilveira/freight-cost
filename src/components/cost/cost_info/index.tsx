import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Loader from '../../loader'
import { CostService } from '../../../services'
import AppConstants from '../../../constants/AppConstants'
import Cost from '../../../types/Cost'
import CostConstants from '../../../constants/CostConstants'
import Button from '@material-ui/core/Button'
import CostDialog from '../cost_dialog/index'
import { toast } from 'react-toastify'
import './styles.css'

const CostInfo: React.FC = () => {
    const [isLoading, setLoading] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [cost, setCost] = useState<Cost | undefined>(undefined)

    useEffect(() => {
        const loadData = async () => {
            const cost = await CostService.get()
            setData(cost)
        }

        let setData = (cost: Cost | false | undefined) => {
            if (cost === false) {
                toast.error(AppConstants.ERROR_LOADING_DATA)
                return
            }
            
            if (cost !== undefined) {
                setCost(cost)
            }
            
            setLoading(false)
        }

        loadData()

        return () => {
            setData = () => {}
        }
    }, [openDialog])

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <Paper className='cost-info' elevation={3}>
            <Loader isLoading={isLoading}>
                <div className='cost-info--box'>
                    <h2 className='cost-info--box--value'> 
                        <span>{`${CostConstants.COST_INFO_TEXT}: `}</span>
                        <span>{CostService.getStringValueWithCurrencySymbol(cost)}</span>
                    </h2>
                    <Button 
                        onClick={handleOpenDialog} 
                        className='cost-info--box--button' 
                        variant="contained" 
                        color="primary"
                    >
                        {CostConstants.COST_BUTTON_TEXT}
                    </Button>
                </div>
            </Loader>
            <CostDialog
                onClose={handleCloseDialog}
                open={openDialog}
                cost={cost}
            />
        </Paper>
    )
}

export default CostInfo