class CustomError extends Error {
  statusCode: number;
  messages: string[];
  constructor(statusCode, messages) {
    super();
    this.statusCode = statusCode;
    this.messages = messages
  }
}

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    if (typeof err.messages === 'string') err.messages = [err.messages];
    return res.status(err.statusCode).json({ error: err.messages })
  }
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

export { CustomError, errorHandlerMiddleware}