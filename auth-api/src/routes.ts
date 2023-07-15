import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';

export function routes(app: any) {
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
}
