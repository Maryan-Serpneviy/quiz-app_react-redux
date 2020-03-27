import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes, { InferProps } from 'prop-types'

import { timeTransform } from '@/helpers/timeTransform'
import Button from '@com/Button'
import classes from './CompletedQuiz.module.scss'

type Props = {
   quiz: object[]
   results: Array<string>
   time: number
   restartQuiz: () => void
}

const CompletedQuiz: React.FC<Props> = (
   { quiz, results, time, restartQuiz }
   : InferProps<typeof CompletedQuiz.propTypes>) => {

   const history = useHistory()

   const getSuccessRate = () => {
      return (results.filter(el => el === 'correct').length / quiz.length * 100).toFixed(2)
   }

   return (
      <div className={classes.CompletedQuiz}>
         <ul className={classes.results}>
            <li className={classes.result}>
               Score: <b>{getSuccessRate()}%</b>
            </li>
            <li className={classes.result}>
               Time: <b>{timeTransform(time)}</b>
            </li>
            <li className={classes.result}>
               Answer AVG: <b>{timeTransform(Math.round(time / results.length))}</b>
            </li>
         </ul>

         <ul>
            {quiz.map((item: { question: string }, index) => (
               <React.Fragment key={index}>
                  <li>
                     <strong>{index + 1}. </strong>
                     {item.question}
                     <i className={
                        `fa ${results[index] === 'correct' ?
                           `fa-check ${classes.correct}` :
                           `fa-times ${classes.incorrect}`}`
                     } />
                  </li>
                  <hr/>
               </React.Fragment>
            ))}
         </ul>

         <Button onClick={restartQuiz} type="success">
            Try again
         </Button>

         <Button onClick={() => history.push('/')} type="primary">
            Quiz list
         </Button>
      </div>
   )
}

CompletedQuiz.propTypes = {
   quiz: PropTypes.array.isRequired,
   results: PropTypes.array.isRequired,
   restartQuiz: PropTypes.func
}

const mapStateToProps = (state: { quiz: { time: number } }) => ({
   time: state.quiz.time
})

export default connect(mapStateToProps, null)(CompletedQuiz)
