const users = [
  {
    email: 'test1@test.cl',
    name: 'test1',
    password: '1'
  },
  {
    email: 'test2@test.cl',
    name: 'test2',
    password: '2'
  },
  {
    email: 'test3@test.cl',
    name: 'test3',
    password: '3'
  }
];

const products = [
  {
    description: 'description1',
    name: 'name1',
    ownerEmail: 'test1@test.cl',
    price: 1000,
    quantity: 1,
    sku: 1
  }
];

const mockDrizzle = {
  insert: () => ({
    values: async () => {}
  }),
  query: {
    Product: {
      findFirst: async () => products[0],
      findMany: async () => products
    },
    User: {
      findFirst: async () => users[0],
      findMany: async () => users
    }
  }
};

export default mockDrizzle;
