import React from 'react'
import './Loader.scss'

export default function Loader() {
   const loaderCols = []
   for (let i = 0; i < 4; i++) {
      loaderCols.push(
         <div className="l_square">
            <span/><span/><span/>
         </div>
      )
   }

   return (
      <div className="loader">
         <div>
            {loaderCols}
         </div>
      </div>
   )
}
