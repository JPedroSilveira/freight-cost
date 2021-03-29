import React, { useState, useEffect } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import Loader from '../../loader'
import Transition from '../../transition'
import PathConstants from '../../../constants/PathConstants'
import Button from '../../button'
import City from '../../../types/City'
import { PathService, CostService } from '../../../services'
import { ShortPathResult, PathResult, Result } from '../../../services/PathService'
import { toast } from 'react-toastify'
import AppConstants from '../../../constants/AppConstants'
import ShortPath from '../../../types/ShortPath'
import ShortPathComponent from '../short_path'
import Path from '../../../types/Path'
import './styles.css'
import StringUtils from '../../../utils/StringUtils'

const ResultDialog: React.FC<{
    open: boolean
    cities?: City[]
    onClose: () => void
}> = ({
    open,
    cities,
    onClose
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [shortPath, setShortPath] = useState<ShortPath | undefined>()
    const [path, setPath] = useState<Path | undefined>()
    const [shortPaths, setShortPaths] = useState<ShortPath[]>([])

    useEffect(() => {
        if (open) {
            const loadData = async () => {
                const cost = await CostService.get()
                if (cost) {
                    if (cities && cities.length >= 2) {
                        if (cities.length === 2) {
                            const result = await PathService.calcShortPath(cities[0], cities[1], cost)
                            setShortPathResult(result)
                        } else {
                            const result = await PathService.calcPath(cities, cost)
                            setPathResult(result)
                        }
                    } else {
                        handleCitiesEmpty()
                    }
                } else {
                    handleLoadDataError()
                }
            }
    
            const isValidResult = (result: Result) => {
                if (result.withError) {
                    toast.error(AppConstants.ERROR_LOADING_DATA)
                } else if (result.withInvalidData) {
                    toast.error(PathConstants.INVALID_DATA)
                    onClose()
                } else if (result.withoutPath) {
                    toast.error(PathConstants.WITHOUT_PATH)
                    onClose()
                } else {
                    return true
                }
    
                return false
            }

            let handleLoadDataError = () => {
                toast.error(AppConstants.ERROR_LOADING_DATA)
                onClose()
            }

            let handleCitiesEmpty = () => {
                setIsLoading(false)
            }
    
            let setShortPathResult = (result: ShortPathResult) => {
                if (isValidResult(result)) {
                    setShortPath(result.shortPath)
                    setIsLoading(false)
                    setShortPaths([result.shortPath!])
                }
            }
    
            let setPathResult = (result: PathResult) => {
                if (isValidResult(result)) {
                    setPath(result.path)
                    setShortPaths(result.path!.shortPaths)
                    setIsLoading(false)
                }
            }
    
            setIsLoading(true)
            loadData()

            return () => {
                setPathResult = () => {}
                setShortPathResult = () => {}
                handleLoadDataError = () => {}
            }
        } else {
            setPath(undefined)
            setShortPath(undefined)
        }
    }, [open, onClose, cities])

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            className='result-dialog'
            aria-labelledby="result-dialog--title"
        >
            <Loader isLoading={isLoading}>
                <DialogTitle id="result-dialog--title">{PathConstants.RESULT_DIALOG_TITLE}</DialogTitle>
                <DialogContent className="result-dialog--content">
                    {shortPaths ?
                        <>
                            <div className="result-dialog--content--paths">
                                <ul>
                                    {shortPaths.map((item, index) => (
                                        <li key={index}>
                                            <ShortPathComponent shortPath={item} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='result-dialog--content--result-data'>
                            {shortPath ? 
                                <p>{`Custo: ${StringUtils.numberToMoneyStringWithSymbol(shortPath.cost)}`}</p>
                            : path &&
                                <>
                                    <p>{`Distância total: ${path.totalDistance} km`}</p>
                                    <p>{`Custo total: ${StringUtils.numberToMoneyStringWithSymbol(path.totalCost)}`}</p>
                                    <p>{`Combustível consumido: ${StringUtils.numberToMoneyString(path.totalFuel)} L`}</p>
                                    <p>{`Total de dias: ${path.totalDays}`}</p>
                                </>
                            }
                            </div>
                        </>
                    :
                        <h3>{PathConstants.NO_DATA}</h3>
                    }
                </DialogContent>
                <DialogActions className="result-dialog--actions" >
                    <Button onClick={onClose}>
                        {PathConstants.CLOSE_BUTTON_TEXT}
                    </Button>
                </DialogActions>
            </Loader>
        </Dialog>
    )
}

export default ResultDialog