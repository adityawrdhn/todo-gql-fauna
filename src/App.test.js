import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Code SPlitting Loader', () => {
  const { container } = render(<App />);
  expect(container.innerHTML).toMatch("Loading...");
});
