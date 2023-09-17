import { CustomError } from '../../src/middleware/customError';
import { body, validationResult } from 'express-validator';
import { Request } from 'express';

export function validationResults(req: Request) {
  const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
      throw new CustomError(400, validationErrors.array().map((e) => e.msg));
    }
    return;
}