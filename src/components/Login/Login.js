import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Form, Field, SubmitButton, errorStatusHandler, errorMessageHandler } from '../../utils/Forms';
import validators from '../../utils/validators';
import { errors } from '../../utils/constants'

function Login(props) {
  const [ passwordError, setPasswordError ] = useState(false);
  const [ userLoginData, setUserLoginData ] = useState({ email: '', password: '' });
  const [ emailError, setEmailError ] = useState(false);

  function errorSpanHandler(prop, status) {
    if (prop === 'email') {
      setEmailError(status);
      return;
    } if (prop === 'password') {
      setPasswordError(status);
    };
  };
  
  function changeUserDataHandler(name, value) {
    setUserLoginData({ ...userLoginData, [name]: value });
  };

  function submitHandler() {
    props.setIsSubmitting(true);
    props.onSubmit(userLoginData);
  };

  return (
    <div className='login'>
      <div className='form__container'>
        <Link to='/' href='#' className='logo logo_place_form' />
        <h1 className='form__greeting'>Рады видеть!</h1>
        <Form className='form'
                type='submit'
                onSubmit={submitHandler}
                validators={validators}>

          <Field className='form__name-span'>
            {(props) => <span {...props}>E-mail</span>}
          </Field>

          <Field name='email'
                  className='form__input'
                  type='email'>

          {({ onChange, ...props}) => {
            return (<input 
                      disabled={props.submitting}
                      className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`}
                      onFocus={() => errorSpanHandler(props.name, true)}
                      onBlur={() => errorSpanHandler(props.name, false)}
                      onChange={(e) => {
                        onChange(e.target.value.trim());
                        changeUserDataHandler(props.name, e.target.value);
                      }} />)
          }}</Field>

          <Field name='email'
                  className='form__error-span'
                  errorslist={{
                    required: errors.required,
                    isValidEmail: errors.isValidEmail,
                  }}>
            {(props) => {
              return (<span {...props} 
                className={`${props.className} ${!emailError && 'form__error-span_type_hidden'}`}>{errorMessageHandler(props)}</span>)
            }}</Field>

          <Field className='form__name-span' >
            {(props) => <span {...props}>Пароль</span>
          }</Field>

          <Field name='password'
                  className='form__input'
                  type='password'>
            {({ onChange, ...props}) => {
              return (<input {...props} 
                      disabled={props.submitting}
                      className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`}
                      onChange={(e) => {
                        onChange(e.target.value);
                        changeUserDataHandler(props.name, e.target.value);
                      }}
                      onFocus={() => errorSpanHandler(props.name, true)}
                      onBlur={() => errorSpanHandler(props.name, false)}/>)
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

          <SubmitButton className='form__button from__button_place_login'
                        type='submit'>{
            ({ disabled , ...props}) => {
              return (<button {...props}
                      className={`${props.className} ${disabled && 'form__button_type_disabled'}`}
                      disabled={disabled && props.submitting}>
                      {'Войти'}
                      </button>)
            }}</SubmitButton>
          </Form>
        <p className='from__status-ask'>Еще не зарегистрированы?{<Link to='/signup' className='link link_place_form link_place_form-login'> Регистрация</Link>}</p>
      </div>
    </div>
  );
};

export default Login;
