import React, { useRef } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import AnswerOption from './AnswerOption'
import classes from './ActiveQuiz.module.scss'
import { shuffle } from '@/helpers/shuffle'
const clone = require('rfdc')()

type Props = {
   current: number
   total?: number
   question: string
   answers: object[]
   status: null | object
   onAnswerClick: (id: number) => void
}

const ActiveQuiz: React.FC<Props> = (
   { current, total, question, answers, status, onAnswerClick } :
   InferProps<typeof ActiveQuiz.propTypes>) => {

   let cached = useRef(null) // persist once shuffled answers between renders

   const getAnswers = (items: object[] = answers): object[] => {
      let shuffled
      if (!status) {
         shuffled = clone(shuffle(items))
         cached.current = [...shuffled]
      } else if (status) {
         shuffled = [...cached.current]
      }
      return shuffled
   }

   return (
      <div className={classes.ActiveQuiz}>
         <p className={classes.question}>
            <span>
               <strong>{current}. </strong>
               {question}
            </span>

            <small>{current} / {total}</small>
         </p>

         <ul className={classes.options}>
            {getAnswers().map((answer, index) => (
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

export default ActiveQuiz
