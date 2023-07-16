import express, { Request, Response } from 'express';
import { routes } from './routes';
import { myDataSource } from '../app-data-source';
import { auth } from './middleware/auth';

myDataSource
  .initialize()
  .then(() => {
    console.log('data source initialized');
  })
  .catch((err) => {
    console.error('error initializing data source:', err);
  });

const app = express();
app.use(express.json());
app.use(auth);

app.get('/api', (req: Request, res: Response) => {
  res.send('Express and Typescript Server. hot diggity.');
});

routes(app);

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`)
});