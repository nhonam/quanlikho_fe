import { useState } from "react";
import { _generateRulesAndValidate } from "src/utils/Validator";

export default function useValidateForm(rules) {
  const [errors, setErrors] = useState({});

  const _validateInput = (name, value) => {
    _generateRulesAndValidate(rules, setErrors, name, value);
  };

  return {
    errors,
    _validateInput,
    setErrors
  };
}
