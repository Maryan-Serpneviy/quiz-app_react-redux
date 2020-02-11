import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import Button from '~cm/Button'
import classes from './CompletedQuiz.module.scss'

const CompletedQuiz: React.FC<Props> = (props: InferProps<typeof CompletedQuiz.propTypes>) => {
   const { quiz, results, restartQuiz } = props

   const getSuccessRate = () => {
      return results.filter(el => el === 'correct').length / quiz.length * 100
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

         <p>Your result is <b>{getSuccessRate()} %</b></p>
         <button className={classes.button} onClick={restartQuiz}>Try again</button>
         {/* <Button onClick={restartQuiz} type="primary">Try again</Button>
         <Button type="success">Quiz list</Button> */}
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
