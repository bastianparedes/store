import { gt } from 'drizzle-orm';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';

import Component from './component';
import drizzle from '../../../../lib/drizzle';
import { Product } from '../../../../lib/drizzle/schema';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email as string;

  // eslint-disable-next-line no-console
  console.log(email);

  const response = await drizzle.query.Product.findMany({
    where: gt(Product.quantity, 0)
  });
  return <Component products={response} />;
}
