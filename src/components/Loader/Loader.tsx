import React from 'react'
import './Loader.scss'

const Loader: React.FC = () => (
   <div className="loader">
      <div className="l_main">
         <div className="l_square">
            <span/><span/><span/>
         </div>
         <div className="l_square">
            <span/><span/><span/>
         </div>
         <div className="l_square">
            <span/><span/><span/>
         </div>
         <div className="l_square">
            <span/><span/><span/>
         </div>
      </div>
   </div>
)

export default Loader
