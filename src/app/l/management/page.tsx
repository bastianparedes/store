import { eq, inArray } from 'drizzle-orm';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';

import Component from './component';
import drizzle from '../../../../lib/drizzle';
import { Buy, Exchange, Product } from '../../../../lib/drizzle/schema';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email as string;

  const productsOwned = await drizzle.query.Product.findMany({
    columns: {
      name: true,
      price: true,
      quantity: true,
      sku: true
    },
    where: eq(Product.ownerEmail, email)
  });

  const skus = productsOwned.map((productOwned) => productOwned.sku);

  const purchases = await drizzle
    .select({
      date: Buy.date,
      id: Buy.id,
      name: Product.name,
      price: Product.price,
      sku: Product.sku
    })
    .from(Buy)
    .where(eq(Buy.buyerEmail, email))
    .innerJoin(Product, eq(Buy.productSku, Product.sku));

  const exchangesSent =
    skus.length === 0
      ? []
      : await drizzle.query.Exchange.findMany({
          where: inArray(Exchange.productOfferedSku, skus),
          with: {
            productOffered: true,
            productRequested: true
          }
        });

  const exchangesReceived =
    skus.length === 0
      ? []
      : await drizzle.query.Exchange.findMany({
          where: inArray(Exchange.productRequestedSku, skus),
          with: {
            productOffered: true,
            productRequested: true
          }
        });

  const sales = await drizzle
    .select({
      date: Buy.date,
      name: Product.name,
      price: Product.price,
      sku: Product.sku
    })
    .from(Buy)
    .innerJoin(Product, eq(Buy.productSku, Product.sku))
    .where(eq(Product.ownerEmail, email));

  return (
    <Component
      productsOwned={productsOwned}
      purchases={purchases}
      exchangesSent={exchangesSent}
      exchangesReceived={exchangesReceived}
      sales={sales}
    />
  );
}
