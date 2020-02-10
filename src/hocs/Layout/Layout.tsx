import React from 'react'
import Quiz from '~cn/Quiz'
import classes from './Layout.module.scss'

export default function Layout(props) {
   return (
      <div className={classes.Layout}>
         <main>
            {props.children}
         </main>
      </div>
   )
}
