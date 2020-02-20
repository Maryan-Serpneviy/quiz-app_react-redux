import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Input.module.scss'

const Input: React.FC<Props> = (props: InferProps<typeof Input.propTypes>) => {
   const {
      label,
      type,
      value,
      error,
      isTouched,
      isValid,
      shouldValidate,
      handleChange
   } = props

   const inputType = type || 'text'
   const htmlFor = `${inputType}-${Math.round(Math.random() * 1000)}`
   const style = [
      classes.input
   ]

   const isInvalid = (): boolean => !isValid && isTouched && shouldValidate

   if (isInvalid()) {
      style.push(classes.invalid)
   }

   return (
      <div className={style.join(' ')}>
         <label htmlFor={htmlFor}>{label}</label>
         <input
            type={inputType}
            id={htmlFor}
            value={value}
            onChange={handleChange}
         />
         {isInvalid() && <span>{error || 'Value is incorrect'}</span>}
      </div>
   )
}

Input.propTypes = {
   label: PropTypes.string,
   type: PropTypes.string,
   value: PropTypes.string,
   error: PropTypes.string,
   isTouched: PropTypes.bool.isRequired,
   isValid: PropTypes.bool.isRequired,
   shouldValidate: PropTypes.bool.isRequired,
   handleChange: PropTypes.func.isRequired
}

interface Props {
   label?: string
   type?: string
   value?: string
   error?: string
   isTouched: boolean
   isValid: boolean
   shouldValidate: boolean
   handleChange: () => void
}

export default Input
