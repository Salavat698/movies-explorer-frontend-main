import validator from 'validator';
import { regexp, passRegexp } from './constants';


const currentUser =  JSON.parse(localStorage.getItem('currentUser'));

const validators = {
  email: {
    required(value){
      return value === '';
    },
    isValidEmail(value){
      return !validator.isEmail(value);
    },
    sameData(value){
      if(JSON.parse(localStorage.getItem('currentUser')) !== null ) {
        return JSON.parse(localStorage.getItem('currentUser')).email === value;
      }
      return false;
    }
  },
  password: {
    required(value){
      return value === '';
    },
    minLength(value){
      return value.length < 8;
    },
    passFormat(value){
      return !passRegexp.test(value);
    }
  },
  name: {
    required(value){
      return value.trim() === '';
    },
    minLength(value){
      return value.length < 2;
    },
    format(value) {
      return !regexp.test(value);
    },
    sameData(value){
      if(JSON.parse(localStorage.getItem('currentUser')) !== null) {
        return JSON.parse(localStorage.getItem('currentUser')).name === value.trim();
      }
      return false
    }
  },
  userMovie: {
    required(value){
      return value === '';
    }, 
    validData(value){
      return value.trim() === '';
    }
  }
}

export default validators;