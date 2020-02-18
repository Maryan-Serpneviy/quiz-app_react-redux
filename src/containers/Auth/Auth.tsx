import React, { Component } from 'react'
import Input from '~cm/Input'
import Button from '~cm/Button'
import classes from './Auth.module.scss'

export default class Auth extends Component {
   state = {
      isFormValid: false,
      formControls: {
         email: {
            value: '',
            type: 'email',
            label: 'Email',
            error: 'Email is invalid',
            isTouched: false,
            isValid: false,
            validation: {
               required: true,
               email: true
            }
         },
         password: {
            value: '',
            type: 'password',
            label: 'Password',
            error: 'Password is invalid',
            isTouched: false,
            isValid: false,
            validation: {
               required: true,
               minLength: 6
            }
         }
      }
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
               handleChange={(e: React.ChangeEvent) => this.handleChange(e, controlName)}
            />
         )
      })
   }

   handleChange = (event: React.ChangeEvent, controlName: string) => {
      const formControls = { ...this.state.formControls }
      const control = { ...formControls[controlName] }

      control.value = event.target.value
      control.isTouched = true
      control.isValid = this.validateControl(control.value, control.validation)

      formControls[controlName] = control

      let isFormValid = true
      Object.keys(formControls).forEach(name => {
         isFormValid = formControls[name].isValid && isFormValid
      })

      this.setState({
         formControls, isFormValid
      })
   }

   validateControl(value: string, validation: object): boolean {
      if (!validation) {
         return true
      }
      let isValid = true

      if (validation.required) {
         isValid = value.trim() !== '' && isValid
      }
      if (validation.email) {
         const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         isValid = re.test(String(value).toLowerCase()) && isValid
      }
      if (validation.minLength) {
         isValid = value.length >= validation.minLength && isValid
      }

      return isValid
   }

   loginHandler = () => {
      //
   }

   registrationHandler = () => {
      //
   }
}
