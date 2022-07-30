import { Form, Field, SubmitButton } from '../../utils/Forms';
import validators from '../../utils/validators';
import { useState } from 'react';
import mainApi from '../../utils/mainApi';
import { useHistory } from 'react-router-dom';
import { errors, userDataChanged } from '../../utils/constants';

function EditProfile(props) {
  const [ emailError, setEmailError ] = useState(false);
  const [ nameError, setNameError ] = useState(false);
  const [ userData, setUserData ] = useState({});
  const [ submitting, setIsSubmitting ] = useState(false);
  const history = useHistory();

  function errorMessageHandler(props) {
    for (const name in props.errors) {
      if(props.errors[name]) {
        return props.errorslist[name];
      };
    };
  };

  function errorStatusHandler(props) {
    for(const name in props.errors) {
      if(props.errors[name]) {
        return true;
      }
    };
    return false;
  };

  function submitHandler() {
    setIsSubmitting(true)
    mainApi.setNewProfileData(userData)
      .then((res) => {
        props.setServerResponseNumber(200);
        props.setServerResponseMsg(userDataChanged);
        props.setIsRequestOk(true);
        localStorage.setItem('currentUser', JSON.stringify(res));
        history.push('/profile');
      })
      .catch((err) => {
        props.setIsRequestOk(false);
        props.setServerResponseNumber(err);
      })
      .finally(() => {
        props.setIsRegPopupShowing(true);
        setIsSubmitting(false);
      })
  };

  function changeUserDataHandler(name, value) {
    setUserData({ ...userData, [name]: value });
  };

  function errorSpanHandler(prop, status) {
    if (prop === 'email') {
      setEmailError(status);
      return;
    }
    if (prop === 'name') {
      setNameError(status);
    }
  };

  return (
    <div className='edit-profile'>
      <div className='form__container form__container_place_edit'>
        <h1 className='form__greeting form__greeting_place_edit'>Редактирование профиля</h1>
        <Form className='form'
              type='submit'
              onSubmit={submitHandler}
              validators={validators}>

          <Field className='form__input form__input_place_edit'
                 name='email'
                 placeholder='E-mail'
                 type='email'>{
            ({ onChange, ...props}) => {
              return (<input
                        placeholder={props.placeholder}
                        disabled={submitting}
                        className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`}
                        onFocus={() => errorSpanHandler(props.name, true)}
                        onBlur={() => errorSpanHandler(props.name, false)}
                        onChange={(e) => {
                          onChange(() => {
                            return e.target.value.toLowerCase();
                          });
                          changeUserDataHandler(props.name, e.target.value)
                        }}/>)
            }}</Field>

          <Field className='form__error-span'
                 name='email'
                 errorslist = {{
                  required: errors.required,
                  isValidEmail: errors.isValidEmail,
                  sameData: errors.sameData,
                }}>
            {(props) => {
              return (<span {...props} 
                className={`${props.className} ${!emailError && 'form__error-span_type_hidden'}`}>
                {errorMessageHandler(props)}
                </span>)
          }}</Field>
          
          <Field className='form__input form__input_place_edit'
                 name='name'
                 placeholder='Имя'
                 type='text'>{
                  ({ onChange, ...props}) => {
                    return (<input 
                              disabled={submitting}
                              placeholder={props.placeholder}
                              className={`${props.className} ${errorStatusHandler(props) && 'form__input_type_error'}`}
                              onFocus={() => errorSpanHandler(props.name, true)}
                              onBlur={() => errorSpanHandler(props.name, false)}
                              onChange={(e) => {
                                onChange(e.target.value);
                                changeUserDataHandler(props.name, e.target.value)
                              }}/>)
          }}</Field>
    
          <Field className='form__error-span'
                 name='name'
                 errorslist = {{
                 required: errors.required,
                 minLength: errors.minNameLength,
                 format: errors.formatError,
                 sameData: errors.sameData,
                }}>
            {(props) => {
              return (<span {...props} 
                className = {`${props.className} ${!nameError && 'form__error-span_type_hidden'}`}>
                {errorMessageHandler(props)}
                </span>)
          }}</Field>
          
          <SubmitButton className='form__button' 
                        type='submit'>{
            ({ disabled , ...props}) => {
              return (<button {...props} 
                     className={`${props.className} ${disabled && 'form__button_type_disabled'}`}
                     disabled={disabled}>
                     {'Сохранить'}
                     </button>)
          }}</SubmitButton>
        </Form>
      </div>
    </div>
  )
};

export default EditProfile;