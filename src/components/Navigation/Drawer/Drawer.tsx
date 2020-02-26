import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes, { InferProps } from 'prop-types'
import BackDrop from '@com/Navigation/BackDrop'
import classes from './Drawer.module.scss'

const Drawer: React.FC<Props> = ({ isOpen, hideMenu }: InferProps<typeof Drawer.propTypes>) => {
   const links = [
      { to: '/', label: 'Quiz List', exact: true },
      { to: '/creator', label: 'Quiz Creator', exact: false },
      { to: '/auth', label: 'Authorization', exact: false }
   ]

   const renderLinks = () => {
      return links.map((link, index) => (
         <li key={index}>
            <NavLink
               to={link.to}
               activeClassName={classes.active}
               exact={link.exact}
               onClick={hideMenu}
            >
               {link.label}
            </NavLink>
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

type Props = {
   isOpen: boolean
   hideMenu: () => void
}

export default Drawer
