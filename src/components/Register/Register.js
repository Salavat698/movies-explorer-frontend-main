import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field, SubmitButton, errorStatusHandler, errorMessageHandler } from '../../utils/Forms';
import validators from '../../utils/validators';
import { errors, name, greeting, email ,password, registerAsk } from '../../utils/constants'

function Register(props) {
  const [ emailError, setEmailError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);
  const [ nameError, setNameError ] = useState(false);
  const [ userRegisterData, setUserRegisterData ] = useState({ name: '', email: '', password: '' });
  const [ submitting, setIsSubmitting ] = useState(false);
  function changeUserDataHandler(name, value) {
    setUserRegisterData({ ...userRegisterData, [name]: value });
  };

  function submitHandler() {
    props.onSubmit(userRegisterData);
  };

  function errorSpanHandler(prop, status) {
    if (prop === 'email') {
      setEmailError(status);
      return;
    };
    if (prop === 'password') {
      setPasswordError(status);
      return;
    };
    if (prop === 'name') {
      setNameError(status);
    };
  };
  
  return (
    <div className='register'>
      <div className='form__container'>
      <Link to='/' href='#' className='logo logo_place_form' />
        <h1 className='form__greeting'>{greeting}</h1>
        <Form className='form'
                type='submit'
                onSubmit={submitHandler}
                validators={validators}>
          <Field className='form__name-span'>
            {(props) => <span {...props}>{name}</span>}
          </Field>


          <Field className='form__input'
                 name='name'
                 type='text'>
            {({ onChange, ...props }) => {
              return (<input 
                disabled={submitting}
                className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`}
                onFocus={() => errorSpanHandler(props.name, true)}
                onBlur={() => errorSpanHandler(props.name, false)}
                onChange={(e) => {
                  onChange(e.target.value.trim());
                  changeUserDataHandler(props.name, e.target.value )
                }} />)
            }}
          </Field>
          
          
          <Field className='form__error-span'
                 name='name'
                 errorslist={{
                  required: errors.required,
                  minLength: errors.minNameLength,
                  format: errors.formatError,
                }}>
            {(props) => {
              return (<span {...props} 
                className={`${props.className} ${!nameError && 'form__error-span_type_hidden'}`}>
                {errorMessageHandler(props)}
                </span>)
            }}
          </Field>
          <Field className='form__name-span'>
            {(props) => <span {...props}>{email}</span>}
          </Field>

          <Field name='email'
                  className='form__input'
                  type='email'>

          {({ onChange, ...props}) => {
            return (<input
                      disabled={submitting}
                      className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`}
                      onFocus={() => errorSpanHandler(props.name, true)}
                      onBlur={() => errorSpanHandler(props.name, false)}
                      onChange={(e) => {
                        onChange(e.target.value.trim());
                        changeUserDataHandler(props.name, e.target.value)
                      }} />)
          }}
          </Field>

          <Field className='form__error-span'
                 name='email'
                 errorslist={{
                   required: errors.required,
                   isValidEmail: errors.isValidEmail,
                 }}>
            {(props) => {
              return (<span {...props}
                className={`${props.className} ${!emailError && 'form__error-span_type_hidden'}`}>{errorMessageHandler(props)}</span>)
            }}
          </Field>

          <Field className='form__name-span'>
            {(props) => <span {...props}>{password}</span>}
          </Field>

          <Field name='password'
                  className='form__input'
                  type='password'>
            {({ onChange, ...props}) => {
              return (<input {...props}
                      disabled={submitting}
                      className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`}
                      onFocus={() => errorSpanHandler(props.name, true)}
                      onBlur={() => errorSpanHandler(props.name, false)}
                      onChange={(e) => {
                        onChange(e.target.value);
                        changeUserDataHandler(props.name, e.target.value);
                      }} />)
            }}</Field>
          
          <Field name='password'
                  className='form__error-span'
                  errorslist={{
                    required: errors.required,
                    minLength: errors.minPassLength,
                    passFormat: errors.badPass,
                  }}>
            {(props) => {
              return (<span {...props}
                      className={`${props.className} ${!passwordError && 'form__error-span_type_hidden'}`}>
                      {errorMessageHandler(props)}
                      </span>)
          }}</Field>

           <SubmitButton className='form__button form__button_place_register'
                         type='submit'>{
            ({ disabled , ...props}) => {
              return (<button {...props}
                      className={`${props.className} ${disabled && 'form__button_type_disabled'}`}
                      disabled={disabled}>
                      {'Зарегистрироваться'}
                      </button>)
           }}</SubmitButton>

        </Form>
        <p className='from__status-ask'>{registerAsk}{<Link to='/signin' className='link link_place_form link_place_form-registration'>Войти</Link>}</p>
      </div>
    </div>
  );
};

export default Register;
