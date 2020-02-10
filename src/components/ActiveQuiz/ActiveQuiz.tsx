import React from 'react'
import classes from './ActiveQuiz.module.scss'

export default function ActiveQuiz(props) {
   const { current, total, answers } = props

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
               <li
                  key={index}
                  className={classes.item}
                  onClick={() => props.onAnswerClick(answer.id)}
               >{answer.text}</li>
            ))}
         </ul>
      </div>
   )
}
