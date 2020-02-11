import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './AnswerOption.module.scss'

const AnswerOption: React.FC<Props> = (props: InferProps<typeof AnswerOption.propTypes>) => {
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

AnswerOption.propTypes = {
   onAnswerClick: PropTypes.func.isRequired,
   answer: PropTypes.object.isRequired,
   status: PropTypes.string
}

interface Props {
   onAnswerClick: (id: number) => void
   answer: object
   status?: string
}

export default AnswerOption
