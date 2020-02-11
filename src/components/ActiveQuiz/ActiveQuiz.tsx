import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import AnswerOption from './AnswerOption'
import classes from './ActiveQuiz.module.scss'

const ActiveQuiz: React.FC<Props> = (props: InferProps<typeof ActiveQuiz.propTypes>) => {
   const {
      current,
      total,
      question,
      answers,
      status,
      onAnswerClick
   } = props

   return (
      <div className={classes.ActiveQuiz}>
         <p className={classes.question}>
            <span>
               <strong>{current}. </strong>
               {question}
            </span>

            <small>{current} of {total}</small>
         </p>

         <ul className={classes.options}>
            {answers.map((answer, index) => (
               <AnswerOption
                  key={index}
                  answer={answer}
                  onAnswerClick={onAnswerClick}
                  status={status ? status[answer.id] : null}
               />
            ))}
         </ul>
      </div>
   )
}

ActiveQuiz.propTypes = {
   current: PropTypes.number.isRequired,
   total: PropTypes.number.isRequired,
   question: PropTypes.string.isRequired,
   answers: PropTypes.array.isRequired,
   onAnswerClick: PropTypes.func.isRequired,
   status: PropTypes.object
}

interface Props {
   current: number
   total?: number
   question: string
   answers: object[]
   status: object
   onAnswerClick: (id: number) => void
}

export default ActiveQuiz
