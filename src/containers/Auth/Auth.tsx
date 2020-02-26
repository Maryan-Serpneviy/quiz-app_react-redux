import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authUser } from '@s/actions/auth'
import { AuthConst } from '@/constants'
import Formic from '@lib/formic'
import Input from '@com/Input'
import Button from '@com/Button'
import classes from './Auth.module.scss'

class Auth extends Component {
   state = {
      formControls: this.createFormControls(),
      isFormValid: false,
      isLoginInvalid: false
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

                  {this.state.isLoginInvalid &&
                  <span className={classes.invalid}>Incorrect email or password</span>}
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
         isLoginInvalid: false,
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

   loginHandler = async() => {
      const authData = {
         email: this.state.formControls.email.value,
         password: this.state.formControls.password.value
      }
      try {
         const response = await this.props.authUser(authData, AuthConst.SIGN_IN)
         if (response.status === 200) {
            //
         }
      } catch (err) {
         this.setState({ isLoginInvalid: true })
      }
   }

   registrationHandler = async() => {
      const authData = {
         email: this.state.formControls.email.value,
         password: this.state.formControls.password.value
      }
      try {
         const response = await this.props.authUser(authData, AuthConst.SIGN_UP)
         if (response.status === 200) {
            //
         }
      } catch (err) {
         console.error(err)
      }
   }
}

const mmapDispatchToProps = (dispatch: authUser) => ({
   authUser: (authData: {
      email: string,
      password: string
   }, authAction: string) => dispatch(authUser(authData, authAction))
})

export default connect(null, mmapDispatchToProps)(Auth)
