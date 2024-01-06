import { relations } from 'drizzle-orm';
import {
  alias,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';

export { alias };

export const User = pgTable('User', {
  address: varchar('address').notNull().default(''),
  city: varchar('city').notNull().default(''),
  country: varchar('country').notNull().default(''),
  email: varchar('email').notNull().primaryKey(),
  name: varchar('name').notNull().default(''),
  phone: varchar('phone').notNull().default('')
});

export const Product = pgTable('Product', {
  description: varchar('description', { length: 10000 }).notNull().default(''),
  name: varchar('name', { length: 100 }).notNull().default(''),
  ownerEmail: varchar('owner_email')
    .notNull()
    .references(() => User.email),
  price: integer('price').notNull(),
  quantity: integer('quantity').notNull().default(0),
  sku: serial('sku').notNull().primaryKey()
});

export const Rating = pgTable('Rating', {
  comment1: varchar('comment1').notNull(),
  comment2: varchar('comment2').notNull(),
  comment3: varchar('comment3').notNull(),
  id: serial('id').notNull().primaryKey(),
  ownerEmail: varchar('owner_email')
    .notNull()
    .references(() => User.email),
  stars1: integer('stars1').notNull(),
  stars2: integer('stars2').notNull(),
  stars3: integer('stars3').notNull()
});

export const Buy = pgTable('Buy', {
  buyerEmail: varchar('buyer_email')
    .notNull()
    .references(() => User.email),
  date: timestamp('date', {
    precision: 0,
    withTimezone: true
  })
    .notNull()
    .defaultNow(),
  id: varchar('id').notNull().primaryKey(),
  productSku: integer('product_sku')
    .notNull()
    .references(() => Product.sku)
});

export const Exchange = pgTable('Exchange', {
  date: timestamp('date', {
    precision: 0,
    withTimezone: true
  })
    .notNull()
    .defaultNow(),
  id: serial('id').notNull().primaryKey(),
  message: varchar('message').notNull(),
  productOfferedSku: integer('first_product_sku')
    .notNull()
    .references(() => Product.sku),
  productRequestedSku: integer('second_product_sku')
    .notNull()
    .references(() => Product.sku),
  resolveDate: timestamp('resolve_date', {
    precision: 0,
    withTimezone: true
  }),
  status: varchar('status', {
    enum: ['proposed', 'rejected', 'accepted']
  }).notNull()
});

export const Chat = pgTable('Chat', {
  date: timestamp('date', {
    precision: 0,
    withTimezone: true
  })
    .notNull()
    .defaultNow(),
  message: varchar('message').notNull(),
  userReceiverEmail: varchar('user_receiver_email')
    .notNull()
    .references(() => User.email),
  userSenderEmail: varchar('user_sender_email')
    .notNull()
    .references(() => User.email)
});

export const UserRelations = relations(User, ({ many }) => ({
  buys: many(Buy),
  chats: many(Chat),
  products: many(Product),
  ratings: many(Rating)
}));

export const ProductRelations = relations(Product, ({ one, many }) => ({
  buys: many(Buy),
  exchanges: many(Exchange),
  user: one(User, {
    fields: [Product.ownerEmail],
    references: [User.email]
  })
}));

export const RatingRelations = relations(Rating, ({ one }) => ({
  user: one(User, {
    fields: [Rating.id],
    references: [User.email]
  })
}));

export const BuyRelations = relations(Buy, ({ one }) => ({
  product: one(Product, {
    fields: [Buy.productSku],
    references: [Product.sku]
  }),
  user: one(User, {
    fields: [Buy.buyerEmail],
    references: [User.email]
  })
}));

export const ExchangeRelations = relations(Exchange, ({ one }) => ({
  productOffered: one(Product, {
    fields: [Exchange.productOfferedSku],
    references: [Product.sku]
  }),
  productRequested: one(Product, {
    fields: [Exchange.productRequestedSku],
    references: [Product.sku]
  })
}));

export const ChatRelations = relations(Chat, ({ one }) => ({
  userReceiverEmail: one(User, {
    fields: [Chat.userReceiverEmail],
    references: [User.email]
  }),
  userSenderEmail: one(User, {
    fields: [Chat.userSenderEmail],
    references: [User.email]
  })
}));
