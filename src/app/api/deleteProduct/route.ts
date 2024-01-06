import { and, eq, or } from 'drizzle-orm';
import { getToken } from 'next-auth/jwt';

import drizzle from '../../../../lib/drizzle';
import { Exchange, Product } from '../../../../lib/drizzle/schema';

const POST = async (request: Request) => {
  const token = await getToken({ req: request as any });
  if (typeof token?.email !== 'string')
    return new Response(JSON.stringify({ success: false }), { status: 404 });

  const body = await request.json();

  const { sku } = body;
  const skuNumber = Number(sku);

  await drizzle
    .update(Product)
    .set({
      quantity: 0
    })
    .where(
      and(eq(Product.ownerEmail, token.email), eq(Product.sku, skuNumber))
    );

  await drizzle
    .update(Exchange)
    .set({
      resolveDate: new Date(),
      status: 'rejected'
    })
    .where(
      and(
        eq(Exchange.status, 'proposed'),
        or(
          eq(Exchange.productOfferedSku, skuNumber),
          eq(Exchange.productRequestedSku, skuNumber)
        )
      )
    );

  return new Response(
    JSON.stringify({
      message: 'Producto eliminado con éxito',
      success: true
    })
  );
};

export { POST };
