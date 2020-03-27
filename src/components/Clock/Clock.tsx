import React, { useState, useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'

type Props = {
   className?: string
   style?: object
   timer?: number
}

const Clock: React.FC<Props> = (
   { className, style, timer } : InferProps<typeof Clock.propTypes>) => {
   
   const [time, setTime] = useState(timer || 0)

   useEffect(() => {
      const interval = setInterval(() => {
         setTime(time + 1)
      }, 1000)
      return () => clearInterval(interval)
   })
   
   const transform = (time: number = timer || 0): string => {
      let seconds: number | string = parseInt(String(time), 10)
      let hours = Math.floor(seconds / 3600)
      let minutes: number | string = Math.floor((seconds - hours * 3600) / 60)
      seconds = seconds - hours * 3600 - minutes * 60

      if (minutes < 10) {
         minutes = `0${minutes}`
      }
      if (seconds < 10) {
         seconds = `0${seconds}`
      }
      return `${minutes}:${seconds}`
   }
   
   return (
      <div
         className={className || ''}
         style={{ ...style }}
      >
         {transform(time)}
      </div>
   )
}

Clock.propTypes = {
   className: PropTypes.string,
   style: PropTypes.object,
   timer: PropTypes.number
}

export default Clock
