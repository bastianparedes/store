import { render } from '@testing-library/react';
import { redirect } from 'next/navigation';

import mockDrizzle from '../../../../../../__mocks__/drizzle';
import Page from '../page';

jest.mock('../../../../../../lib/drizzle', () => mockDrizzle);
jest.mock('next/navigation');

describe('Page', () => {
  it('should render', async () => {
    const { container } = render(await Page({ params: { sku: '1' } }));
    expect(container).toMatchSnapshot();
  });

  it('should redirect when sku is NaN', async () => {
    render(await Page({ params: { sku: 'a' } }));
    expect(redirect).toHaveBeenCalled();
  });
});
