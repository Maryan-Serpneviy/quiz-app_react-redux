import React, { useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { connect } from 'react-redux'
import * as Action from '@s/actions/quiz'
import Loader from '@com/Loader'
import LoaderSm from '@com/LoaderSm'
import ActiveQuiz from '@com/ActiveQuiz'
import CompletedQuiz from '@com/CompletedQuiz'
import classes from './Quiz.module.scss'

const Quiz: React.FC<Props> = ({
   isLoading,
   quiz,
   current,
   answerStatus,
   completed,
   results,
   fetchQuiz,
   onAnswerClick,
   restartQuiz,
   ...props
}: InferProps<typeof Quiz.propTypes>) => {
   
   useEffect(() => {
      fetchQuiz(props.match.params.id)

      return () => {
         restartQuiz()
      }
   }, [])

   return (
      <div className={classes.Quiz}>
         <div className={classes.wrapper}>
            <h1>Quiz</h1>

            {isLoading && <LoaderSm />}

            {!isLoading && !completed && quiz.length && <ActiveQuiz
               current={current + 1}
               total={quiz.length}
               question={quiz[current].question}
               answers={quiz[current].answers}
               onAnswerClick={onAnswerClick}
               status={answerStatus}
            />}

            {!isLoading && completed && (
               <CompletedQuiz
                  quiz={quiz}
                  results={results}
                  restartQuiz={restartQuiz}
            />)}
         </div>
      </div>
   )
}

Quiz.propTypes = {
   isLoading: PropTypes.bool.isRequired,
   quiz: PropTypes.array.isRequired,
   current: PropTypes.number.isRequired,
   answerStatus: PropTypes.object,
   completed: PropTypes.bool.isRequired,
   results: PropTypes.array.isRequired,
   fetchQuiz: PropTypes.func.isRequired,
   onAnswerClick: PropTypes.func.isRequired,
   restartQuiz: PropTypes.func.isRequired
}

type Props = {
   isLoading: boolean
   quiz: [{
      question: string,
      answers: object[]
   }]
   current: number
   answerStatus: null | object
   completed: boolean
   results: object[]
   fetchQuiz: (id: string) => void
   onAnswerClick: (id: number) => void
   restartQuiz: () => void
}

const mapStateToProps = (state: { quiz: Props }) => ({
   isLoading: state.quiz.isLoading,
   quiz: state.quiz.quiz,
   current: state.quiz.current,
   answerStatus: state.quiz.answerStatus,
   completed: state.quiz.completed,
   results: state.quiz.results
})

const mapDispatchToProps = (dispatch: Action) => ({
   fetchQuiz: (id: string) => dispatch(Action.fetchQuiz(id)),
   onAnswerClick: (id: number) => dispatch(Action.onAnswerClick(id)),
   restartQuiz: () => dispatch(Action.restartQuiz())
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
