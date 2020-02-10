import React from 'react'
import AnswerOption from './AnswerOption'
import classes from './ActiveQuiz.module.scss'

export default function ActiveQuiz(props) {
   const { current, total, answers, status, onAnswerClick } = props

   return (
      <div className={classes.ActiveQuiz}>
         <p className={classes.question}>
            <span>
               <strong>{current}. </strong>
               {props.question}
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
