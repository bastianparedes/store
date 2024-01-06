const get = (cookieName: string) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

const set = (name: string, value: string | number, exdays: number) => {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * exdays);
  const expires = date.toUTCString();
  document.cookie = `${name}=${String(value)};expires=${expires};path=/;`;
};

const remove = (cname: string) => {
  set(cname, '', -1);
};

const cookie = { get, remove, set };

export default cookie;
