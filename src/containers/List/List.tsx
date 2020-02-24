import React, { useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchQuizes } from '@s/actions/quiz'
import Loader from '@com/Loader'
import LoaderSm from '@com/LoaderSm'
import classes from './List.module.scss'

const List: React.FC<Props> = ({
   // eslint-disable-next-line no-shadow
   fetchQuizes, isLoading, quizList }
   : InferProps<typeof List.propTypes>) => {

   useEffect(() => {
      fetchQuizes()
   }, [])

   return (
      <div className={classes.quizlist}>
         <div>
            <h1>Quiz list</h1>

            {isLoading && <LoaderSm/>}
            {!isLoading && (
               <ul>
                  {quizList.map((quiz: object) => (
                     <li key={quiz.id}>
                        <NavLink to={`/quiz/${quiz.id}`}>
                           {quiz.name}
                        </NavLink>
                     </li>
                  ))}
               </ul>
            )}
            {!isLoading && !quizList.length && (
               <Link to="/creator" className={classes.createQuiz}>
                  Create quiz
               </Link>
            )}
         </div>
      </div>
   )
}

List.propTypes = {
   isLoading: PropTypes.bool.isRequired,
   quizList: PropTypes.array.isRequired,
   fetchQuizes: PropTypes.func.isRequired
}

interface Props {
   isLoading: boolean
   quizList: object[]
   fetchQuizes: () => object
}

const mapStateToProps = (state): object => ({
   quizList: state.quiz.quizList,
   isLoading: state.quiz.isLoading
})

const mapDispatchToProps = (dispatch): object => ({
   fetchQuizes: () => dispatch(fetchQuizes())
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
