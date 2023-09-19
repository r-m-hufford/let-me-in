import React from 'react';
import { render } from '@testing-library/react';
import AccountInfo from './AccountInfo';
import { MemoryRouter } from 'react-router-dom';

// Mock the useAuth context for the test
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      createdAt: '2023-01-01T00:00:00.000Z', // Replace with a valid date string
    },
  }),
}));

test('AccountInfo renders user data when user is available', () => {
  const { getByText } = render(    
    <MemoryRouter>
      <AccountInfo />
    </MemoryRouter>
  );

  expect(getByText('user data:')).toBeInTheDocument();
  expect(getByText('first name:')).toBeInTheDocument();
  expect(getByText('John')).toBeInTheDocument();
  expect(getByText('last name:')).toBeInTheDocument();
  expect(getByText('Doe')).toBeInTheDocument();
  expect(getByText('email:')).toBeInTheDocument();
  expect(getByText('john@example.com')).toBeInTheDocument();
  // expect(getByText('Joined On:')).toBeInTheDocument();
});

test('AccountInfo renders loading message when user is not available', () => {
  // Mock the useAuth context to return null user (user not available)
  jest.mock('../../context/AuthContext', () => ({
    useAuth: () => ({
      user: null,
    }),
  }));

    const { getByText } = render(    
    <MemoryRouter>
      <AccountInfo />
    </MemoryRouter>
  );

  expect(getByText('loading user jawn...')).toBeInTheDocument();
});
