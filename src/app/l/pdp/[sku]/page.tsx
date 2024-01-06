import { and, eq, gt } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';

import Component from './component';
import drizzle from '../../../../../lib/drizzle';
import { Product } from '../../../../../lib/drizzle/schema';
import transaction from '../../../../../lib/transbank';

interface Context {
  params: Record<string, string | undefined>;
  searchParams: Record<string, string | undefined>;
}

export default async function Page(req: Context) {
  const skuNumber = Number(req.params.sku);
  if (Number.isNaN(skuNumber)) redirect('/l/plp');

  const product = await drizzle.query.Product.findFirst({
    where: eq(Product.sku, skuNumber)
  });

  if (product === undefined) notFound();

  const headersList = headers();
  const referer = headersList.get('referer');
  const session = await getServerSession(authOptions);
  const watcherEmail = session?.user?.email;
  if (
    typeof watcherEmail !== 'string' ||
    referer === null ||
    product.quantity <= 0
  )
    redirect('/l/plp');

  const origin = new URL(referer).origin;
  const url = new URL(path.join(origin, '/api/payment'));
  url.searchParams.append('email', watcherEmail);
  url.searchParams.append('sku', String(skuNumber));

  const creation: {
    token: string;
    url: string;
  } = await transaction.create(
    uuidv4().substring(0, 26), //orden de compra
    uuidv4().substring(0, 26), //session id
    product.price,
    url.toString()
  );

  const watcherProducts = await drizzle.query.Product.findMany({
    where: and(eq(Product.ownerEmail, watcherEmail), gt(Product.quantity, 0))
  });

  return (
    <Component
      creation={creation}
      watcherEmail={watcherEmail}
      product={product}
      watcherProducts={watcherProducts}
    />
  );
}
