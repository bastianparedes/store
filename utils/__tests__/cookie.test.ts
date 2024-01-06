import cookie from '../cookie';

beforeEach(() => {
  Object.defineProperty(global.document, 'cookie', {
    value: 'cookie1=value1',
    writable: true
  });
});

describe('get', () => {
  it('should return the value of an existing cookie', () => {
    const result = cookie.get('cookie1');
    expect(result).toBe('value1');
  });

  it('should return null when when a cookie does not exist', () => {
    const result = cookie.get('cookie0');
    expect(result).toBeNull();
  });
});

describe('set', () => {
  it('should create new cookie if it does not exist', () => {
    const initialValue = cookie.get('cookie2');
    expect(initialValue).toBeNull();

    cookie.set('cookie2', 'value2', 1);
    const finalValue = cookie.get('cookie2');
    expect(finalValue).toBe('value2');
  });

  it('should replace value it cookie already exists', () => {
    const initialValue = cookie.get('cookie1');
    expect(initialValue).toBe('value1');

    cookie.set('cookie1', 'value2', 1);
    const finalValue = cookie.get('cookie1');
    expect(finalValue).toBe('value2');
  });
});

describe('set', () => {
  it('should create new cookie if it does not exist', () => {
    const initialValue = cookie.get('cookie2');
    expect(initialValue).toBeNull();

    cookie.set('cookie2', 'value2', 1);
    const finalValue = cookie.get('cookie2');
    expect(finalValue).toBe('value2');
  });

  it('should replace value it cookie already exists', () => {
    const initialValue = cookie.get('cookie1');
    expect(initialValue).toBe('value1');

    cookie.set('cookie1', 'value2', 1);
    const finalValue = cookie.get('cookie1');
    expect(finalValue).toBe('value2');
  });
});

describe('remove', () => {
  it('should remove an existing cookie', () => {
    const initialValue = cookie.get('cookie1');
    expect(initialValue).toBe('value1');

    cookie.remove('cookie1');
    const finalValue = cookie.get('cookie1');
    expect(finalValue).toBe('');
  });

  it('should do nothing with unexisting cookie', () => {
    const initialValue = cookie.get('cookie2');
    expect(initialValue).toBeNull();

    cookie.remove('cookie2');
    const finalValue = cookie.get('cookie2');
    expect(finalValue).toBe('');
  });
});
