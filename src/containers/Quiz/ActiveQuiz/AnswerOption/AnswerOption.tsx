import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './AnswerOption.module.scss'

type Props = {
   onAnswerClick: (id: number) => void
   answer: {
      id: number
      text: string
   }
   status?: string
}

const AnswerOption: React.FC<Props> = (
   { answer, status, onAnswerClick } :
   InferProps<typeof AnswerOption.propTypes>) => {
   
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

AnswerOption.propTypes = {
   onAnswerClick: PropTypes.func.isRequired,
   answer: PropTypes.object.isRequired,
   status: PropTypes.string
}

export default AnswerOption
