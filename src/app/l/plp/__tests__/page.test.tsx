import { render } from '@testing-library/react';

import mockDrizzle from '../../../../../__mocks__/drizzle';
import Page from '../page';

jest.mock('../../../../../lib/drizzle', () => mockDrizzle);

describe('Page', () => {
  it('should render', async () => {
    const { container } = render(await Page());
    expect(container).toMatchSnapshot();
  });
});
