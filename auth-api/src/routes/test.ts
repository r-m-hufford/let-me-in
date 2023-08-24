import express, { Request, Response } from 'express';

export const testRouter = express.Router();

testRouter.get("/", async (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        data: 'test data',
        date: new Date(),
        success: true
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'internal server error' });
    }
  })