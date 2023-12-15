import { useCallback, useState } from "react"

export default function FormValidation() {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});

  function handleChange(evt) {

    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((values) => {
      return { ...values, [name]: value }
    })

    setErrors((errors) => {
      return { ...errors, [name]: validationMessage }
    })

    setIsInputValid((inputValid) => {
      return { ...inputValid, [name]: valid }
    })

    setIsValid(form.checkValidity())
  }

  function reset(data = {}) {
    setValues(data)
    setErrors({})
    setIsValid(false)
    setIsInputValid({})
  }

  const setValue = useCallback((name, value) => {
    setValues((values) => {
      return { ...values, [name]: value }
    })
  }, [])

  return { values, errors, isValid, isInputValid, handleChange, reset, setValue }

}