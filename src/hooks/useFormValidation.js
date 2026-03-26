import { useState, useCallback } from "react";

export default function useFormValidation(initialValues, validate) {
  const [values, setValuesState] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValues = useCallback((newValues) => {
    setValuesState(newValues);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValuesState((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (validate) {
      const newValues = { ...values, [name]: value };
      const validationErrors = validate(newValues);
      setErrors(validationErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setValuesState(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    setValues,
    setErrors,
  };
}