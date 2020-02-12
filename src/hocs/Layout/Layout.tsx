import React, { useState } from 'react'
import MenuToggle from '~cm/Navigation/MenuToggle'
import Drawer from '~cm/Navigation/Drawer'
import classes from './Layout.module.scss'

const Layout: React.FC = ({ children }) => {
   const [menuOpen, setMenuOpen] = useState(false)

   const toggleMenu = () => setMenuOpen(!menuOpen)

   const hideMenu = () => setMenuOpen(false)

   return (
      <div className={classes.Layout}>
         <Drawer
            isOpen={menuOpen}
            hideMenu={hideMenu}
         />

         <MenuToggle
            toggleMenu={toggleMenu}
            isOpen={menuOpen}
         />

         <main>
            {children}
         </main>
      </div>
   )
}

export default Layout
