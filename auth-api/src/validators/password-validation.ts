import { checkSchema } from "express-validator";

export function passwordResetValidation() {
  return checkSchema({
    currentPassword:{
      notEmpty: { errorMessage: 'password must not be empty' }
    },
    password: { 
      isLength: { 
        options: {
          min: 2,
          max: 10
        },
        errorMessage: 'password must not be more than 1 and less than 10 characters long.' } 
    },
    confirmPassword: { 
      isLength: { 
        options: {
          min: 2,
          max: 10
        },
        errorMessage: 'password must not be more than 1 and less than 10 characters long.' },
    }
  })
}