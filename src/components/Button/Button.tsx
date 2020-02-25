import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Button.module.scss'

const Button: React.FC<Props> = (props: InferProps<typeof Button.propTypes>) => {
   const { onClick, disabled, children } = props
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
   onClick: PropTypes.func.isRequired,
   disabled: PropTypes.bool
}

type Props = {
   onClick: () => void
   disabled: boolean
   children: JSX.Element[] | JSX.Element
}

export default Button
