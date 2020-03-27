import React, { useRef } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import AnswerOption from './AnswerOption'
import Clock from '@com/Clock'
import classes from './ActiveQuiz.module.scss'
import { shuffle } from '@/helpers/shuffle'
const clone = require('rfdc')()

type Props = {
   current: number
   total?: number
   question: string
   answers: Array<{ id: number, text: string }>
   status: null | { [key: string]: string }
   onAnswerClick: (id: number) => void
}

type Answers = Array<{ id: number, text: string }>

const ActiveQuiz: React.FC<Props> = (
   { current, total, question, answers, status, onAnswerClick }
   : InferProps<typeof ActiveQuiz.propTypes>) => {

   const cached = useRef(null) // persist once shuffled answers between renders

   const getAnswers = (items: Answers = answers): Answers => {
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
         <div className={classes.question}>
            <span>{question}</span>

            <small className={classes.clock}>
               <Clock className={classes.clock} />
            </small>
            <small className={classes.total}>{current} / {total}</small>
         </div>

         <ul className={classes.options}>
            {getAnswers().map((answer: { id: number, text: string }, index) => (
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
   //status: PropTypes.oneOf([null, PropTypes.objectOf(PropTypes.string)])
   status: PropTypes.object
}

export default ActiveQuiz
