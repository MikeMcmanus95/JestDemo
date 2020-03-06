import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders a div with an id of calculator', () => {
  const { getByText } = render(<App />);
  expect(
    getByText((content, element) => {
      return element.id.toLowerCase() === 'calculator';
    })
  ).toBeTruthy();
});
