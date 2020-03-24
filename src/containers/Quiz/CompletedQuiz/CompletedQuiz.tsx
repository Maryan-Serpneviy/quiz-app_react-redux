import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { useHistory } from 'react-router-dom'
import Button from '@com/Button'
import classes from './CompletedQuiz.module.scss'

type Props = {
   quiz: object[]
   results: string[]
   restartQuiz: () => void
}

const CompletedQuiz: React.FC<Props> = (
   { quiz, results, restartQuiz } :
   InferProps<typeof CompletedQuiz.propTypes>) => {
   
   const history = useHistory()

   const getSuccessRate = () => {
      return (results.filter(el => el === 'correct').length / quiz.length * 100).toFixed(2)
   }

   return (
      <div className={classes.CompletedQuiz}>
         <ul>
            {quiz.map((item: { question: string }, index) => (
               <li key={index}>
                  <strong>{index + 1}. </strong>
                  {item.question}
                  <i className={
                     `fa ${results[index] === 'correct' ?
                        `fa-check ${classes.correct}` :
                        `fa-times ${classes.incorrect}`}`
                  } />
               </li>
            ))}
         </ul>

         <p className={classes.result}>You scored <b>{getSuccessRate()}%</b></p>
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

export default CompletedQuiz
