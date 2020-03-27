import React, { useState } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { connect } from 'react-redux'
import MenuToggle from '@com/Navigation/MenuToggle'
import Drawer from '@com/Navigation/Drawer'
import classes from './Layout.module.scss'

type Props = {
   isAuthorized?: boolean
   token?: string
   children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<Props> = (
   { isAuthorized, children } : InferProps<typeof Layout.propTypes>) => {

   const [menuOpen, setMenuOpen] = useState(false)

   const toggleMenu = () => setMenuOpen(!menuOpen)
   const hideMenu = () => setMenuOpen(false)

   return (
      <div className={classes.Layout}>
         <Drawer
            isOpen={menuOpen}
            hideMenu={hideMenu}
            isAuthorized={isAuthorized}
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

Layout.propTypes = {
   isAuthorized: PropTypes.bool
}

const mapStateToProps = (state: { auth: Props }) => ({
   isAuthorized: Boolean(state.auth.token)
})

export default connect(mapStateToProps)(Layout)
