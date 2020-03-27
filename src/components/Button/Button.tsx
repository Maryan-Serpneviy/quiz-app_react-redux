import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Button.module.scss'

type Props = {
   style?: object
   type?: string
   disabled?: boolean
   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
   onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void
   onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void
   children: JSX.Element[] | JSX.Element
}

const Button: React.FC<Props> = (
   { style, disabled, onClick, children, ...props }
   : InferProps<typeof Button.propTypes>) => {

   const styles = [
      classes.button,
      classes[props.type]
   ]

   return (
      <button
         className={styles.join(' ')}
         style={{ ...style }}
         disabled={disabled}
         onClick={onClick}
         onMouseDown={props.onMouseDown || null}
         onMouseUp={props.onMouseUp || null}
      >
         {children}
      </button>
   )
}

Button.propTypes = {
   style: PropTypes.object,
   type: PropTypes.string,
   disabled: PropTypes.bool,
   onClick: PropTypes.func,
   onMouseDown: PropTypes.func,
   onMouseUp: PropTypes.func
}

export default Button
