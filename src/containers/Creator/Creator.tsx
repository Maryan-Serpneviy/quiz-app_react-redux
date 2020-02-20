import React, { Component } from 'react'
import Axios from 'axios'
import Formic from '~/lib/formic'
import Input from '~cm/Input'
import Select from '~cm/Select'
import Button from '~cm/Button'
import classes from './Creator.module.scss'

export default class Creator extends Component {
   state = {
      quiz: [],
      correctId: 1,
      formControls: this.createFormControls(),
      isFormValid: false
   }

   render() {
      const { quiz, correctId, isFormValid } = this.state

      return (
         <div className={classes.quizCreator}>
            <div>
               <h1>Quiz creation</h1>

               <form onSubmit={e => e.preventDefault()}>
                  {this.renderInputs()}
                  
                  <Select
                     label="Specify an correct answer"
                     value={correctId}
                     options={[
                        { text: 1, value: 1 },
                        { text: 2, value: 2 },
                        { text: 3, value: 3 },
                        { text: 4, value: 4 }
                     ]}
                     onChange={this.handleSelect}
                  />

                  <Button
                     type="primary"
                     disabled={!isFormValid}
                     onClick={this.addQuestion}
                  >
                     Add question
                  </Button>

                  <Button
                     type="success"
                     disabled={!quiz.length}
                     onClick={this.createQuiz}
                  >
                     Create quiz
                  </Button>
               </form>
            </div>
         </div>
      )
   }

   renderInputs() {
      const { formControls } = this.state
      return Object.keys(formControls).map((controlName, index) => {
         const control = formControls[controlName]

         return (
            <React.Fragment key={index}>
               <Input
                  label={control.label}
                  value={control.value}
                  error={control.error}
                  isTouched={control.isTouched}
                  isValid={control.isValid}
                  shouldValidate={!!control.validation}
                  handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     this.handleChange(event.target.value, controlName)
                  }}
               />
               {index === 0 && <hr/>}
            </React.Fragment>
         )
      })
   }

   handleChange = (value: string, controlName: string) => {
      const formControls = { ...this.state.formControls }
      const control = { ...formControls[controlName] }

      control.value = value
      control.isTouched = true
      control.isValid = Formic.validate(control.value, control.validation)

      formControls[controlName] = control

      this.setState({
         formControls,
         isFormValid: Formic.validateForm(formControls)
      })
   }

   createFormControls(): object {
      return {
         question: Formic.createControl({
            label: 'Enter question',
            error: 'Cannot be empty'
         }, { required: true }),
         option1: this.createOption(1),
         option2: this.createOption(2),
         option3: this.createOption(3),
         option4: this.createOption(4)
      }
   }

   createOption(next: number): object {
      return Formic.createControl({
         id: next,
         label: `Option ${next}`,
         error: 'Cannot be empty'
      }, { required: true })
   }

   handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      this.setState({
         correctId: Number(event.target.value)
      })
   }

   addQuestion = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      const { question, option1, option2, option3, option4 } = this.state.formControls
      const quiz = this.state.quiz.concat()
      const index = quiz.length + 1

      const questionItem = {
         question: question.value,
         id: index,
         correctId: this.state.correctId,
         answers: [
            { id: option1.id, text: option1.value },
            { id: option2.id, text: option2.value },
            { id: option3.id, text: option3.value },
            { id: option4.id, text: option4.value }
         ]
      }
      quiz.push(questionItem)
      this.setState({
         quiz,
         isFormValid: false,
         correctId: 1,
         formControls: this.createFormControls()
      })
   }

   createQuiz = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      try {
         await Axios.post('https://quiz-app-react-85b48.firebaseio.com/quiz.json', this.state.quiz)
         this.setState({
            quiz: [],
            isFormValid: false,
            correctId: 1,
            formControls: this.createFormControls()
         })
      } catch (err) {
         console.error(err)
      }
   }
}
