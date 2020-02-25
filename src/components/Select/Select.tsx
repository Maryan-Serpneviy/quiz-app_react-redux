import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Select.module.scss'

const Select: React.FC<Props> = ({
   label, value, options, onChange
}: InferProps<typeof Select.propTypes>) => {

   const htmlFor = `${label}-${Math.round(Math.random() * 1000)}`

   return (
      <div className={classes.select}>
         <label htmlFor={htmlFor}>{label}</label>
         <select
            id={htmlFor}
            value={value}
            onChange={onChange}
         >
            {options.map((option: { value: string, text: string }, index) => (
               <option
                  key={option.value + index}
                  value={option.value}
               >
                  {option.text}
               </option>
            ))}
         </select>
      </div>
   )
}

Select.propTypes = {
   label: PropTypes.string,
   value: PropTypes.number.isRequired,
   options: PropTypes.array.isRequired,
   onChange: PropTypes.func.isRequired
}

type Props = {
   label?: string
   value: number
   options: object[]
   onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default Select
