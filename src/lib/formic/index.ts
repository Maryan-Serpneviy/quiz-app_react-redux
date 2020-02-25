type Validation = {
   required: boolean
   email: boolean
   name: boolean
   minLength: number
}

class Formic {
   createControl(config: object, validation: object): object {
      return {
         isTouched: false,
         isValid: !validation,
         value: '',
         ...config,
         validation
      }
   }

   validate(value: string, validation: Validation = null): boolean {
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

      if (validation.name) {
         const re = /^[ a-zA-Zа-яА-яїЇіІєЄьЬ#№]+$/
         isValid = re.test(value.toLowerCase()) && isValid
      }
      
      if (validation.minLength) {
         isValid = value.trim().length >= validation.minLength && isValid
      }
      
      return isValid
   }

   validateForm(formControls: object): boolean {
      let isFormValid: boolean = !this.hasRepeatingValues(formControls)

      for (let control in formControls) {
         if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].isValid && isFormValid
         }
      }

      return isFormValid
   }

   hasRepeatingValues(formControls: object): boolean {
      let values = new Set()
      const controlsCount: number = Object.keys(formControls).length

      for (let control in formControls) {
         if (formControls.hasOwnProperty(control)) {
            values.add(formControls[control].value)
         }
      }
      return controlsCount !== values.size
   }
}

export default new Formic()
