import React from 'react';

import { render } from '@testing-library/react';

import Component from '../component';

const buy = {
  buyerEmail: 'buyer@test.com',
  date: new Date(1702249134816),
  id: 'id-buy-1',
  productSku: 1
};

const product = {
  description: 'description',
  name: 'name',
  ownerEmail: 'seller@test.com',
  price: 10000,
  quantity: 5,
  sku: 1
};

it('should render', () => {
  const { container } = render(<Component buy={buy} product={product} />);
  expect(container).toMatchSnapshot();
});
