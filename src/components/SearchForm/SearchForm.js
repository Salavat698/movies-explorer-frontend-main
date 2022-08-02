import { Form } from "../../utils/Forms";
import validators from "../../utils/validators";
import {
  Field,
  SubmitButton,
  errorMessageHandler,
  errorStatusHandler,
} from "../../utils/Forms";
import { useState, useRef } from "react";
import { errors, shorts } from "../../utils/constants";

function SearchForm(props) {
  const [movieError, setMovieError] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const checkboxRef = useRef();

  function errorSpanHandler(prop, status) {
    if (prop === "userMovie") {
      setMovieError(status);
    }
  }

  function submitHandler() {
    props.setIsShortFilm(false);
    checkboxRef.current.checked = false;
    setMovieError(true);
    setIsSubmiting(true);
    props.getMovieHandler();
    setTimeout(() => {
      setIsSubmiting(false);
    }, 2000);
  }

  function setToLocalStorege(value) {
    localStorage.setItem(props.searchKeyword, value.toLowerCase());
  }

  return (
    <div className="search-form__container">
      <Form
        className="search-form"
        type="submit"
        onSubmit={submitHandler}
        validators={validators}
      >
        <div className="search-form__input-container">
          <Field
            className="search-form__input"
            placeholder="Фильм"
            name="userMovie"
            type="submit"
          >
            {({ onChange, ...props }) => {
              return (
                <input
                  disabled={isSubmiting}
                  placeholder={props.placeholder}
                  className={`${props.className} ${
                    errorStatusHandler(props) && "serch-form__input_type_error"
                  }`}
                  onFocus={() => errorSpanHandler(props.name, true)}
                  onBlur={() => errorSpanHandler(props.name, false)}
                  onChange={(e) => {
                    onChange(e.target.value.trim());
                    setToLocalStorege(e.target.value.trim());
                  }}
                  onSubmit={props.onSubmit}
                />
              );
            }}
          </Field>
          <Field
            name="userMovie"
            className="search-form__error-span"
            errorslist={{
              required: errors.required,
              validData: errors.badValue,
            }}
          >
            {(props) => {
              return (
                <span
                  {...props}
                  className={`${props.className} ${
                    !movieError && "search-form__error-span_type_hidden"
                  }`}
                >
                  {errorMessageHandler(props)}
                </span>
              );
            }}
          </Field>
        </div>
        <SubmitButton className="search-form__button" type="submit">
          {({ disabled, ...props }) => {
            return (
              <button
                {...props}
                type={"submit"}
                className={`${props.className} ${
                  disabled && "search-form__button_type_disabled"
                }`}
                disabled={disabled || isSubmiting}
              />
            );
          }}
        </SubmitButton>
        <div className="search-form__border" />
        <div className="search-form__checkbox-container">
          <input
            className="search-form__checkbox"
            ref={checkboxRef}
            name="shorts"
            onClick={props.shortsToggler}
            type="checkbox"
          />
          <p className="search-form__checkbox-caption">{shorts}</p>
        </div>
      </Form>
    </div>
  );
}

export default SearchForm;
