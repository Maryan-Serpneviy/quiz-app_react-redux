import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import BackDrop from '~cm/Navigation/BackDrop'
import classes from './Drawer.module.scss'

const links = [
   1, 2, 3
]

const Drawer: React.FC<Props> = ({ isOpen, hideMenu }: InferProps<typeof Drawer.propTypes>) => {
   const renderLinks = () => {
      return links.map((link, index) => (
         <li key={index}>
            <a>Link {link}</a>
         </li>
      ))
   }

   const style = [classes.drawer]
   if (!isOpen) {
      style.push(classes.close)
   }

   return (
      <>
         <nav className={style.join(' ')}>
            <ul>
               {renderLinks()}
            </ul>
         </nav>
         {isOpen && <BackDrop hideMenu={hideMenu} />}
      </>
   )
}

Drawer.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   hideMenu: PropTypes.func.isRequired
}

interface Props {
   isOpen: boolean
   hideMenu: () => void
}

export default Drawer
