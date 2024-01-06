import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import Component from './component';
import drizzle from '../../../../../lib/drizzle';
import { Buy, Product } from '../../../../../lib/drizzle/schema';

interface Context {
  params: {
    buyOrder: string;
  };
  searchParams: Record<string, string | undefined>;
}

export default async function Page(req: Context) {
  const buy = await drizzle.query.Buy.findFirst({
    where: eq(Buy.id, req.params.buyOrder)
  });

  if (buy === undefined) notFound();

  const product = await drizzle.query.Product.findFirst({
    where: eq(Product.sku, buy.productSku)
  });

  if (product === undefined) notFound();

  return <Component buy={buy} product={product} />;
}
