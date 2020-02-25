import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes, { InferProps } from 'prop-types'
import BackDrop from '@com/Navigation/BackDrop'
import classes from './Drawer.module.scss'

const links = [
   { to: '/', label: 'Quiz list', exact: true },
   { to: '/auth', label: 'Authorize', exact: false },
   { to: '/creator', label: 'Create quiz', exact: false }
]

const Drawer: React.FC<Props> = ({ isOpen, hideMenu }: InferProps<typeof Drawer.propTypes>) => {
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
