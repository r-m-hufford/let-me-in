import { body, checkSchema, validationResult } from 'express-validator';

export function signupValidation() {
  return checkSchema({
    firstName: { 
      isArray: {errorMessage: 'must be an array'}, 
      isBoolean: {errorMessage: 'must be a boolean'}, 
      notEmpty: {errorMessage: 'must not be empty'} }
  })
}