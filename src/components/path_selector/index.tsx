import React, { useState, useEffect, useRef } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import City from '../../types/City'
import CityService from '../../services/CityService'
import { toast } from 'react-toastify'
import AppConstants from '../../constants/AppConstants'
import CityConstants from '../../constants/CityConstants'
import SortUtils from '../../utils/SortUtils'
import Button from '../button'
import { Paper } from '@material-ui/core'
import Loader from '../loader'
import StringUtils from '../../utils/StringUtils'
import './styles.css'

interface SelectionCity extends City {
    selected: boolean
}

const PathSelector: React.FC<{
    cityService: CityService
    onCalcPath: (path: City[]) => void
}> = ({
    onCalcPath,
    cityService
}) => {
    const [isLoading, setLoading] = useState(true)
    const [cities, setCities] = useState<City[]>([])
    const [options, setOptions] = useState<SelectionCity[]>([])
    const [path, setPath] = useState<SelectionCity[]>([])
    const [input, setInput] = useState('')

    useEffect(() => {
        const loadData = async () => {
            const cities = await cityService.getAll()
            setData(cities)
        }

        let setData = (data: City[] | false) => {
            if (data) {
                const orderedData = data.sort((a,b) => SortUtils.alphabetically(a.name, b.name))
                setCities(orderedData)
                const selectionData = orderedData.map(item => ({
                    ...item,
                    selected: false
                } as SelectionCity))
                setOptions(selectionData)
                setLoading(false)
            } else {
                toast.error(AppConstants.ERROR_LOADING_DATA)
            }
        }

        loadData()

        return () => {
            setData = () => { }
        }
    }, [cityService])

    const addCopyInOptions = (city: SelectionCity) => {
        const copy = {
            ...city,
            selected: false
        }
        options.push(copy)
        const orderedData = options.sort((a,b) => SortUtils.alphabetically(a.name, b.name))
        setOptions([...orderedData])
    }

    const removeOneCopyInOptions = (city: SelectionCity) => {
        const copies = options.filter(option => option.name === city.name)
        if (copies.length > 1) {
            const newOptions = options.filter(option => option !== city)
                .sort((a,b) => SortUtils.alphabetically(a.name, b.name))
            setOptions([...newOptions])
        } else if (copies.length > 0) {
            const unique = copies[0]
            unique.selected = false
            setOptions([...options])
        }
    }

    const handleButtonClick = () => {
        onCalcPath(path)
        setPath([])
        setInput('')
        const selectionData = cities.map(item => ({
            ...item,
            selected: false
        } as SelectionCity))
        setOptions(selectionData)
    }

    const handleSelectionChange = (event: React.ChangeEvent<{}>, cities: SelectionCity[]) => {
        if (cities.length === 0) {
            handleSelectionRemoveAll()
        } else if (path.length > cities.length) {
            handleSelectionRemove(cities)
        } else {
            handleSelectionAdd(cities)
        }
    }

    const handleSelectionRemove = (cities: SelectionCity[]) => {
        const removeItem = path.find(item => cities.every(city => city !== item))
        if (removeItem) removeOneCopyInOptions(removeItem)
        setPath(cities)
    }

    const handleSelectionAdd = (cities: SelectionCity[]) => {
        const selectedCity = cities[cities.length - 1]
        addCopyInOptions(selectedCity)
        selectedCity.selected = true
        setPath(cities)
    }
    
    const handleSelectionRemoveAll = () => {
        const selectionData = cities.map(item => ({
            ...item,
            selected: false
        } as SelectionCity))
        setOptions(selectionData)
        setPath([])
    }

    const handleSelectionInputChange = (event: React.ChangeEvent<{}>, value: string) => {
        const optionMatch = handleInputSeparetor(value)
        optionMatch ? setInput('') : setInput(value)
    }

    const handleInputSeparetor = (value: string) => {
        if (value.endsWith(',')) {
            const normilizedOptionValue = StringUtils.removerSpecials(value.substr(0, value.length - 1).toLocaleUpperCase())
            const option = options.find(item => {
                if (item.selected) return false
                const normalizedItemName = StringUtils.removerSpecials(item.name.toLocaleUpperCase())
                return normalizedItemName === normilizedOptionValue
            })
            if (option) {
                addCopyInOptions(option)
                option.selected = true
                path.push(option)
                setPath([...path])
                return true
            }
        }

        return false
    }

    return (
        <Paper className='path-selector' elevation={3}>
            <Loader isLoading={isLoading}>
                <h2>{CityConstants.PATH_SELECTION_TITLE}</h2>
                <div className='path-selector--input-container'>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        className='path-selector--input-container--autocomplete'
                        options={options}
                        onInputChange={handleSelectionInputChange}
                        inputValue={input}
                        value={path}
                        noOptionsText={CityConstants.CITY_NOT_FOUND}
                        onChange={handleSelectionChange}
                        getOptionLabel={(option) => option.name}
                        defaultValue={[]}
                        filterSelectedOptions
                        getOptionSelected={(c1: SelectionCity, c2: SelectionCity) => c1.selected}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label={CityConstants.CITIES_SELECT_LABEL}
                                placeholder={CityConstants.CITIES_SELECT_PLACE_HOLDER}
                            />
                        )}
                    />
                </div>
                <div className='path-selector--button-container'>
                    <Button variant="contained" onClick={handleButtonClick}>
                        {CityConstants.CALC_BUTTON_TEXT}
                    </Button>
                </div>
            </Loader>
        </Paper>
    )
}

export default PathSelector