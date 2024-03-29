import { authRouter } from './routes/auth';
import { invalidateTokensRouter } from './routes/invalidate-tokens';
import { userRouter } from './routes/users';
import { passwordRouter } from './routes/password';

export function routes(app: any) {
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/invalidatetokens', invalidateTokensRouter);
  app.use('/api/password', passwordRouter);
}
