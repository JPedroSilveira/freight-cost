import React, { useState, useRef, useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import CostConstants from '../../../constants/CostConstants'
import Transition from '../../transition'
import Cost from '../../../types/Cost'
import { CostService } from '../../../services'
import Loader from '../../loader'
import AppConstants from '../../../constants/AppConstants'
import { toast } from 'react-toastify'
import './styles.css'

const CostDialog: React.FC<{
  open: boolean
  cost?: Cost
  onClose: () => void
}> = ({
  open,
  cost,
  onClose
}) => {
    const [isLoading, setLoading] = useState(false)
    const [value, setValue] = useState(CostService.moneyMask(CostService.getStringValueWithDot(cost)))
    const [currentSelection, setCurrentSelection] = useState<number | null>(null)
    const inputRef = useRef<HTMLInputElement>()

    useEffect(() => {
      if (inputRef.current) {
        if (currentSelection === null) {
          inputRef.current.selectionStart = value.length
          inputRef.current.selectionEnd = value.length
        } else {
          inputRef.current.selectionStart = currentSelection
          inputRef.current.selectionEnd = currentSelection
        }
      }
    }, [currentSelection, value])

    const handleSave = async () => {
      setLoading(true)

      const newCost: Cost = {
        value: parseFloat(value)
      }

      const [isValid, errorMessage] = CostService.isValid(newCost)

      if (!isValid) {
        toast.error(errorMessage)
      } else {
        const result = await CostService.save(newCost)
        if (!result) {
          toast.error(AppConstants.UNKNOW_ERROR)
        } else {
          toast.success(AppConstants.SUCCESS)
          onClose()
        }
      }

      setLoading(false)
    }

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (inputRef.current) {
        setCurrentSelection(inputRef.current.selectionStart)
        setValue(CostService.moneyMask(event.target.value))
      }
    }

    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        className='alert-dialog'
        aria-labelledby="alert-dialog--title"
      >
        <Loader isLoading={isLoading}>
          <DialogTitle id="alert-dialog--title">{CostConstants.UPDATE_COST_DIALOG_TITLE}</DialogTitle>
          <DialogContent>
            <TextField
              id='alert-dialog--value'
              label={CostConstants.UPDATE_COST_LABEL_TEXT}
              name='custo'
              type="tel"
              value={value}
              inputRef={inputRef}
              onChange={handleChangeTextField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              {CostConstants.CANCEL_BUTTON_TEXT}
            </Button>
            <Button onClick={handleSave} color="primary">
              {CostConstants.SAVE_BUTTON_TEXT}
            </Button>
          </DialogActions>
        </Loader>
      </Dialog>
    )
  }

export default CostDialog