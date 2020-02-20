import React, { Component } from 'react'
import Formic from '~/lib/formic'
import Input from '~cm/Input'
import Button from '~cm/Button'
import classes from './Auth.module.scss'

export default class Auth extends Component {
   state = {
      formControls: this.createFormControls(),
      isFormValid: false
   }

   render() {
      return (
         <div className={classes.auth}>
            <div>
               <h1>Authorize</h1>

               <form onSubmit={e => e.preventDefault()}>
                  {this.renderInputs()}

                  <Button
                     type="success"
                     onClick={this.loginHandler}
                     disabled={!this.state.isFormValid}
                  >Log in</Button>

                  <Button
                     type="primary"
                     onClick={this.registrationHandler}
                     disabled={!this.state.isFormValid}
                  >Register</Button>
               </form>
            </div>
         </div>
      )
   }

   renderInputs() {
      const { formControls } = this.state

      return Object.keys(formControls).map((controlName: string, i) => {
         const control: object = formControls[controlName]
         return (
            <Input
               key={controlName + i}
               label={control.label}
               type={control.type}
               value={control.value}
               error={control.error}
               isTouched={control.isTouched}
               isValid={control.isValid}
               shouldValidate={!!control.validation}
               handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.handleChange(event.target.value, controlName)
               }}
            />
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
         email: Formic.createControl({
            type: 'email',
            label: 'Email',
            error: 'Email is invalid'
         }, {
            required: true,
            email: true
         }),
         password: Formic.createControl({
            type: 'password',
            label: 'Password',
            error: 'Password is invalid'
         }, {
            required: true,
            minLength: 6
         })
      }
   }

   loginHandler = () => {
      //
   }

   registrationHandler = () => {
      //
   }
}
