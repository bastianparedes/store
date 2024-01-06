import React from 'react';

import { render } from '@testing-library/react';

import Component from '../component';

const product = {
  description: 'description',
  name: 'name',
  ownerEmail: 'test@test.cl',
  price: 1000,
  quantity: 10,
  sku: 1
};

it('should render', () => {
  const { container } = render(<Component product={product} />);
  expect(container).toMatchSnapshot();
});
