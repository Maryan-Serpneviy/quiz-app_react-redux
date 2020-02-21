import React from 'react'
import classes from './Loader.module.scss'

export default function Loader() {
   const { loader, wrapper, square } = classes

   const loaderCols = []
   for (let i = 0; i < 4; i++) {
      loaderCols.push(
         <div className={square} key={i}>
            <span/><span/><span/>
         </div>
      )
   }

   return (
      <div className={loader}>
         <div className={wrapper}>
            {loaderCols}
         </div>
      </div>
   )
}
