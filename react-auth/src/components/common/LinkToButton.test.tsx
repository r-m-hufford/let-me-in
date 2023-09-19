import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter to mock the router

import LinkToButton from './LinkToButton'; // Adjust the import path as needed

test('LinkToButton navigates to the specified path when clicked', () => {
  const path = '/';
  const label = 'Click Me';
  const { getByText } = render(
    <MemoryRouter>
      <LinkToButton path={path} label={label} />
    </MemoryRouter>
  );

  const button = getByText(label);

  fireEvent.click(button);

  // With MemoryRouter, you can access the current pathname like this:
  const currentPath = window.location.pathname;

  expect(currentPath).toBe(path);
});
