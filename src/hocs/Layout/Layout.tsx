import React, { useState } from 'react'
import MenuToggle from '~cm/Navigation/MenuToggle'
import Drawer from '~cm/Navigation/Drawer'
import classes from './Layout.module.scss'

export default function Layout(props) {
   const [menuOpen, setMenuOpen] = useState(false)

   const toggleMenu = () => setMenuOpen(!menuOpen)

   return (
      <div className={classes.Layout}>
         <Drawer isOpen={menuOpen} />

         <MenuToggle
            toggleMenu={toggleMenu}
            isOpen={menuOpen}
         />

         <main>
            {props.children}
         </main>
      </div>
   )
}
