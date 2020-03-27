import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes, { InferProps } from 'prop-types'
import { setQuizTime } from '@s/actions/quiz'
import { timeTransform } from '@/helpers/timeTransform'

type Props = {
   className?: string
   style?: object
   time?: number
   setQuizTime: (time: number) => void
}

const Clock: React.FC<Props> = (
   // eslint-disable-next-line no-shadow
   { className, style, time, setQuizTime } : InferProps<typeof Clock.propTypes>) => {

   const [timer, setTimer] = useState(time || 0)

   useEffect(() => {
      const interval = setInterval(() => {
         setTimer(timer + 1)
      }, 1000)
      return () => {
         clearInterval(interval)
         setQuizTime(timer)
      }
   })
   
   return (
      <div className={className || ''} style={{ ...style }}>
         {timeTransform(timer)}
      </div>
   )
}

Clock.propTypes = {
   className: PropTypes.string,
   style: PropTypes.object,
   time: PropTypes.number
}

const mapDispatchToProps = (dispatch: any) => ({
   setQuizTime: (time: number) => dispatch(setQuizTime(time))
})

export default connect(null, mapDispatchToProps)(Clock)
