import { User } from "@src/models/user";

export function getTestUser(): User {
  return {
    userId: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    userCode: 'abc123',
    email: 'jane@doe.com',
    password: 'password',
    createdAt: new Date(),
    modifiedAt: new Date(),
    roles: []
  };
}

export function getTestSanitizedUser(): Partial<User> {
  return {
    firstName: 'Jane',
    lastName: 'Doe',
    userCode: 'abc123',
    email: 'jane@doe.com',
    createdAt: new Date(),
    modifiedAt: new Date(),
    roles: []
  };
}

//? why did i put this here?
export function getTestNewUser(): User {
  return {
    userId: 1,
    firstName: 'new',
    lastName: 'guy',
    userCode: 'abc123',
    email: 'newGuy@email.com',
    password: 'password',
    createdAt: new Date(),
    modifiedAt: new Date(),
    roles: []
  };
}