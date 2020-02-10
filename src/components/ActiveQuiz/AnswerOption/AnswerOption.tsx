import React from 'react'
import classes from './AnswerOption.module.scss'

export default function AnswerOption(props) {
   const { answer, status, onAnswerClick } = props
   const styles = [classes.item]

   if (status) {
      styles.push(classes[status])
   }

   return (
      <li
         className={styles.join(' ')}
         onClick={() => onAnswerClick(answer.id)}
      >
         {answer.text}
      </li>
   )
}
