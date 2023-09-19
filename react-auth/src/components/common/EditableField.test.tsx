import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditableField from './EditableField';

describe('EditableField component', () => {
  it('renders with initial data and allows editing', () => {
    const { getByText, getByPlaceholderText } = render(
      <EditableField initialData="Initial Data" type="text" name="fieldName" />
    );

    // Ensure that the initial data is displayed
    expect(getByText('Initial Data')).toBeInTheDocument();

    // Click the edit button to enter editing mode
    fireEvent.click(getByText('edit'));

    // Find the input field and update its value
    const inputField = getByPlaceholderText('Initial Data');
    fireEvent.change(inputField, { target: { value: 'Updated Data' } });

    // Check if the input field contains the updated data
    expect(inputField).toHaveValue('Updated Data');
  });
});
