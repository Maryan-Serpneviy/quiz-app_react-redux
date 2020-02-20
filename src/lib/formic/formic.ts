class Formic {
   createControl(config: object, validation: object): object {
      return {
         ...config,
         validation,
         isTouched: false,
         isValid: !validation,
         value: ''
      }
   }

   validate(value: string, validation: object = null): boolean {
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

   validateForm(formControls: object): boolean {
      let isFormValid = true

      for (let control in formControls) {
         if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].isValid && isFormValid
         }
      }

      return isFormValid
   }
}

export default new Formic()
