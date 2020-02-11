import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Button.module.scss'

const Button: React.FC<Props> = (props: InferProps<typeof Button.propTypes>) => {
   const { handleClick, disabled } = props
   const style = [
      classes.button,
      classes[props.type]
   ]

   return (
      <button
         className={style.join(' ')}
         onClick={handleClick}
         disabled={disabled}
      >
         {props.children}
      </button>
   )
}

Button.propTypes = {
   handleClick: PropTypes.func.isRequired,
   disabled: PropTypes.bool
}

interface Props {
   handleClick: () => void
   disabled: boolean
}

export default Button
