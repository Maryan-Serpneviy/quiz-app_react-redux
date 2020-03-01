import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Button.module.scss'

type Props = {
   type?: string
   disabled?: boolean
   onClick: () => void
   children: JSX.Element[] | JSX.Element
}

const Button: React.FC<Props> = (
   { onClick, disabled, children, ...props } :
   InferProps<typeof Button.propTypes>) => {

   const style = [
      classes.button,
      classes[props.type]
   ]

   return (
      <button
         className={style.join(' ')}
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   )
}

Button.propTypes = {
   type: PropTypes.string,
   disabled: PropTypes.bool,
   onClick: PropTypes.func.isRequired
}

export default Button
