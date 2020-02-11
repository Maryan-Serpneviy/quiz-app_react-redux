import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Drawer.module.scss'

const links = [
   1, 2, 3
]

const Drawer = ({ isOpen }) => {
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
      <nav className={style.join(' ')}>
         <ul>
            {renderLinks()}
         </ul>
      </nav>
   )
}

export default Drawer
