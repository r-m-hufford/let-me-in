import { checkSchema } from 'express-validator';

export function signupValidation() {
  return checkSchema({
    firstName: { 
      notEmpty: { errorMessage: 'first name must not be empty' } 
    },
    lastName: { 
      notEmpty: { errorMessage: 'last name must not be empty' } 
    },
    email: { 
      notEmpty: { errorMessage: 'email must not be empty' },
      isEmail: { errorMessage: 'must be valid emial' }
    },
    password: { 
      notEmpty: { errorMessage: 'password must not be empty' } 
    },
    confirmPassword: { 
      notEmpty: { errorMessage: 'password must not be empty' } 
    }
  })
}

export function updateValidation() {
    return checkSchema({
    firstName: {
      optional: true, 
      notEmpty: { errorMessage: 'first name must not be empty' } 
    },
    lastName: { 
      optional: true, 
      notEmpty: { errorMessage: 'last name must not be empty' } 
    },
    email: { 
      optional: true, 
      notEmpty: { errorMessage: 'email must not be empty' },
      isEmail: { errorMessage: 'must be valid emial' }
    },
    password: { 
      optional: true, 
      notEmpty: { errorMessage: 'password must not be empty' } 
    },
    confirmPassword: { 
      optional: true, 
      notEmpty: { errorMessage: 'password must not be empty' } 
    }
  })
}