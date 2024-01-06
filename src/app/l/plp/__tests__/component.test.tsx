import React from 'react';

import { render } from '@testing-library/react';

import Component from '../component';

const products = [
  {
    description: 'description1',
    name: 'name1',
    ownerEmail: 'test1@test.cl',
    price: 1000,
    quantity: 10,
    sku: 1
  },
  {
    description: 'description2',
    name: 'name2',
    ownerEmail: 'test2@test.cl',
    price: 2000,
    quantity: 20,
    sku: 2
  }
];

it('should render', () => {
  const { container } = render(<Component products={products} />);
  expect(container).toMatchSnapshot();
});
