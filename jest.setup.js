import '@testing-library/jest-dom';
import { afterEach, jest } from '@jest/globals';

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});
