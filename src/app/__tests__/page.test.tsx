import React from 'react';

import { render } from '@testing-library/react';

import Page from '../page';

it('should render', () => {
  const { container } = render(<Page />);
  expect(container).toMatchSnapshot();
});
