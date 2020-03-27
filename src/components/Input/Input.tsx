import React, { useRef, useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Input.module.scss'

type Props = {
   label?: string
   type?: string
   value?: string
   error?: string
   touched?: boolean
   untouched?: boolean
   dirty?: boolean
   pristine?: boolean
   valid?: boolean
   invalid?: boolean
   shouldValidate: boolean
   errors?: object
   autoblur?: boolean
   autofocus?: boolean
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
   onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
   onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
   onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
   onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
   onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const Input: React.FC<Props> = (
   { label, type, value, error, touched, valid, errors,
     shouldValidate, autoblur, autofocus, onChange,
     ...props } : InferProps<typeof Input.propTypes>) => {

   const inputRef = useRef(null)

   const inputType = type || 'text'
   const htmlFor = label ? `${inputType}-${Math.round(Math.random() * 1000)}` : null
   const style = [
      classes.input
   ]

   const isInvalid = (): boolean => !valid && touched && shouldValidate

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
         {label && <label htmlFor={htmlFor}>{label}</label>}
         <input
            ref={autofocus || autoblur ? inputRef : null}
            type={inputType}
            id={htmlFor}
            value={value}
            onChange={onChange}
            onKeyDown={props.onKeyDown || null}
            onKeyUp={props.onKeyUp || null}
            onKeyPress={props.onKeyPress || null}
            onFocus={props.onFocus || null}
            onBlur={props.onBlur || null}
         />
         {error && !errors && isInvalid() && <span>{error}</span>}
         {!error && errors && (
            <ul className={classes.errors}>
               {Object.entries(errors).map(error => {
                  if (error[1]) {
                     return <li key={error[0]}>{error[0]}</li>
                  }
                  return null
               })}
            </ul>
         )}
      </div>
   )
}

Input.propTypes = {
   label: PropTypes.string,
   type: PropTypes.string,
   value: PropTypes.string.isRequired,
   error: PropTypes.string,
   touched: PropTypes.bool,
   untouched: PropTypes.bool,
   dirty: PropTypes.bool,
   pristine: PropTypes.bool,
   valid: PropTypes.bool,
   invalid: PropTypes.bool,
   shouldValidate: PropTypes.bool,
   errors: PropTypes.object,
   autoblur: PropTypes.bool,
   autofocus: PropTypes.bool,
   onChange: PropTypes.func.isRequired,
   onKeyDown: PropTypes.func,
   onKeyUp: PropTypes.func,
   onKeyPress: PropTypes.func,
   onFocus: PropTypes.func,
   onBlur: PropTypes.func
}

export default Input
