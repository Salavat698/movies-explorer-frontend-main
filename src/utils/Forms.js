import React, { useCallback, useContext, useEffect, useState } from "react";

const FormContext = React.createContext({});

export const Form = ({children, className, validators, onChange, onSubmit}) => {
  const [ formValues, setForValues ] = useState({});
  const [ isInvalid, setIsInvalid ] = useState(true);
  const [ formErrors, setFormErrors ] = useState({});

  const onChangeInput = useCallback((name, value) => {
    setForValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }, []);

  useEffect(() => {
    const formKeys = Object.keys(formValues); 
    const allErrors = formKeys.map((key) => {
      const ValueByKey = formValues[key];
      if(!validators[key]) {
        return {};
      }
      const errors = Object.entries(validators[key]).map(([ errorKey, validator ]) => {
        return { [errorKey]: validator(ValueByKey) }
      }).reduce((acc, item) => ({...acc, ...item}) , {});
      return { [key]: errors }
    }).reduce((acc, item) => ({...acc, ...item}), {});
    setFormErrors(allErrors);
  },[formValues, setFormErrors, validators]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
    // setIsInvalid(true);
  };

  useEffect(() => {
    for (let fieldKey in formErrors) {
      const errorKeys = formErrors[fieldKey];
      for (let errorKey in errorKeys) {
        if (errorKeys[errorKey] === true) {
          return setIsInvalid(true);
        }
        setIsInvalid(false);
      }
    }
  }, [formErrors, setIsInvalid]);

  const formContextValue = {
    onChangeInput,
    isInvalid,
    formErrors,
    formValues,
  }; 

  return (
    <form className = {className}
          onSubmit = {handleSubmit}>
      <FormContext.Provider value={formContextValue}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

export const Field = ({ children, name, className, type, errorslist, placeholder, id}) => {
  const [ value, setValue] = useState('');
  const { onChangeInput, formErrors, formValues } = useContext(FormContext);

  useEffect(() => {
    onChangeInput(name, value,);
  }, [value, name, onChangeInput ]);

  return (
    children({
      name,
      className,
      type,
      errorslist,
      errors: formErrors[name],
      values: formValues[name],
      placeholder,
      id,
      onChange: setValue,
    })
  );
};

export const SubmitButton = ({ children, className, type, form }) => {
  const { isInvalid } = useContext(FormContext);
  return (
    children({
      className,
      type,
      form,
      disabled: isInvalid,
    })
  );
};

export const errorMessageHandler = (props) => {
  for (const name in props.errors) {
    if(props.errors[name]) {
      return props.errorslist[name];
    };
  };
};

export const errorStatusHandler = (props) => {
  for(const name in props.errors) {
    if(props.errors[name]) {
      return true;
    };
  };
  return false;
};