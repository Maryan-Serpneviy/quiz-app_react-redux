import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { useHistory } from 'react-router-dom'
import Button from '@com/Button'
import classes from './CompletedQuiz.module.scss'

const CompletedQuiz: React.FC<Props> = (props: InferProps<typeof CompletedQuiz.propTypes>) => {
   const { quiz, results, restartQuiz } = props
   const history = useHistory()

   const getSuccessRate = () => {
      return (results.filter(el => el === 'correct').length / quiz.length * 100).toFixed(2)
   }

   return (
      <div className={classes.CompletedQuiz}>
         <ul>
            {quiz.map((item, index) => (
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

interface Props {
   quiz: object[]
   results: string[]
   restartQuiz: () => void
}

export default CompletedQuiz
