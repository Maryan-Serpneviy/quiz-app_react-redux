import React, { useRef, useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Input.module.scss'

const Input: React.FC<Props> = ({
   label,
   type,
   value,
   error,
   isTouched,
   isValid,
   shouldValidate,
   autoblur,
   autofocus,
   onChange,
   onKeyDown,
   onKeyUp,
   onKeyPress
}: InferProps<typeof Input.propTypes>) => {

   const inputRef = useRef(null)

   const inputType = type || 'text'
   const htmlFor = `${inputType}-${Math.round(Math.random() * 1000)}`
   const style = [
      classes.input
   ]

   const isInvalid = (): boolean => !isValid && isTouched && shouldValidate

   if (isInvalid()) {
      style.push(classes.invalid)
   }

   useEffect(() => {
      if (autoblur) {
         inputRef.current.blur()
      }
      if (autofocus) {
         inputRef.current.focus()
      }
   }, [])

   return (
      <div className={style.join(' ')}>
         <label htmlFor={htmlFor}>{label}</label>
         <input
            ref={autofocus || autoblur ? inputRef : null}
            type={inputType}
            id={htmlFor}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown ? onKeyDown : null}
            onKeyUp={onKeyUp ? onKeyUp : null}
            onKeyPress={onKeyPress ? onKeyPress : null}
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
   autoblur: PropTypes.bool,
   autofocus: PropTypes.bool,
   onChange: PropTypes.func.isRequired,
   onKeyDown: PropTypes.func,
   onKeyUp: PropTypes.func,
   onKeyPress: PropTypes.func
}

type Props = {
   label?: string
   type?: string
   value?: string
   error?: string
   isTouched: boolean
   isValid: boolean
   shouldValidate: boolean
   autoblur?: boolean
   autofocus?: boolean
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
   onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
   onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
   onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export default Input
