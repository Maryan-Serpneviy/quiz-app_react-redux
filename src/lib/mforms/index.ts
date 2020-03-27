type ValidatorsType = {
   required?: (value: string) => boolean
   email?: (value: string) => boolean
   title?: (value: string) => boolean
   minLength?: (length: number) => (value: string) => boolean
   maxLength?: (length: number) => (value: string) => boolean
   pattern?: (re: RegExp) => (value: string) => boolean
}

class Validators {
   static required(value: string): boolean {
      return Boolean(value.trim())
   }

   static email(value: string): boolean {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
      return re.test(value.toLowerCase())
   }

   static title(value: string): boolean {
      const re = /^[- a-zA-Zа-яА-яїЇіІєЄьЬ#№]+$/
      return re.test(value.toLowerCase())
   }

   static minLength(minLength: number): Function {
      return function minlength(value: string): boolean {
         return value.trim().length >= minLength
      }
   }

   static maxLength(maxLength: number): Function {
      return function maxlength(value: string): boolean {
         return value.trim().length <= maxLength
      }
   }

   static pattern(re: RegExp): Function {
      return function checkPattern(value: string): boolean {
         return re.test(String(value).toLowerCase())
      }
   }
}

abstract class AbstractControl {
   constructor() { /**/ }
   // custom
   validators?: ValidatorsType
   type?: InputType
   id?: number | string
   label?: string
   placeholder?: string
   error?: string
   // built-in
   value: string
   touched: boolean
   untouched: boolean
   pristine: boolean
   dirty: boolean
   invalid: boolean
   valid: boolean
   errors: { [key: string]: boolean } | {}

   validate: () => void
}

class FormControl extends AbstractControl {
   constructor(control: Control, validators?: ValidatorsType) {
      super()

      this.value = ''
      this.touched = false
      this.untouched = true
      this.pristine = true
      this.dirty = false
      this.invalid = false
      this.valid = !validators
      this.errors = {}

      this.id = control.id || `control${Math.round(Math.random() * 1000)}`
      this.type = control.type || 'text'
      this.label = control.label || ''
      this.placeholder = control.placeholder || ''
      this.error = control.error || null
      
      this.validators = validators

      this.validate = function(): void {
         if (!this.validators) {
            this.valid = true
            return
         }
         this.touched = true
         this.untouched = false
         this.pristine = !this.value.length
         this.dirty = Boolean(this.value.length)

         let isValid = true
         for (const validator of this.validators) {
            isValid = validator(this.value) && isValid

            // storing errors
            !validator(this.value) ?
               this.errors[validator.name] = true :
               this.errors[validator.name] = false
         }
         this.valid = isValid
         this.invalid = !isValid
      }
   }
}

abstract class AbstractGroup {
   constructor() { /**/ }
   controls: { [key: string]: AbstractControl }
   valid: true
   invalid: boolean
   validate: () => void
}

class FormGroup extends AbstractGroup {
   constructor(controls: { [key: string]: AbstractControl }) {
      super()

      this.controls = controls
      this.valid = true
      this.invalid = false
      this.validate = function(): void {
         let isFormValid: boolean = !this._hasRepeatingValues(controls)

         for (const control in this.controls) {
            if (controls.hasOwnProperty(control)) {
               isFormValid = controls[control].valid && isFormValid
            }
         }
         this.valid = isFormValid
         this.invalid = !isFormValid
      }
   }

   _hasRepeatingValues(): boolean {
      let values = new Set()
      const controlsCount: number = Object.keys(this.controls).length

      for (let control in this.controls) {
         if (this.controls.hasOwnProperty(control)) {
            values.add(this.controls[control].value)
         }
      }
      return controlsCount !== values.size
   }
}

type InputType = 'text' | 'tel' | 'url' | 'number' | 'email' | 'password'

interface Control {
   type: InputType
   id?: number | string
   label: string
   placeholder: string
   value: string
   error: string
   touched: boolean
   untouched: boolean
   valid: boolean
   invalid: boolean
   validators: ValidatorsType
}

export { FormGroup, FormControl, Control, Validators }
