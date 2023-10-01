import type { NextAuthOptions, User } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: 'username: ',
          type: 'string',
          placeholder: 'username'
        },
        password: {
          label: "passowrd: ",
          type: 'password',
          placeholder: 'password'
        }
      },
      async authorize(credentials: any): Promise<any>{
        // here is where you retrieve data from a database
        const user = { id: 42, name: 'ryan', password: 'password' };
        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
}