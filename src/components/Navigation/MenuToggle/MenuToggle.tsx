import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './MenuToggle.module.scss'

type Props = {
   toggleMenu: () => void
   isOpen: boolean
}

const MenuToggle: React.FC<Props> = ({ toggleMenu, isOpen }: InferProps<typeof MenuToggle.propTypes>) => {
   let style = [
      classes.MenuToggle,
      'fa'
   ]

   isOpen ?
      style = [...style, 'fa-times', classes.open] :
      style.push('fa-bars')

   return (
      <i
         className={style.join(' ')}
         onClick={toggleMenu}
      />
   )
}

MenuToggle.propTypes = {
   toggleMenu: PropTypes.func.isRequired,
   isOpen: PropTypes.bool.isRequired
}

export default MenuToggle
