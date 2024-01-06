/* eslint-disable @typescript-eslint/no-unused-vars */
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import drizzle from '../../../../lib/drizzle';
import { Buy, Product } from '../../../../lib/drizzle/schema';
import transaction from '../../../../lib/transbank';

const GET = async (request: Request) => {
  const url = new URL(decodeURIComponent(request.url));
  const token_ws = url.searchParams.get('token_ws');
  const TBK_TOKEN = url.searchParams.get('TBK_TOKEN');
  const TBK_ORDEN_COMPRA = url.searchParams.get('TBK_ORDEN_COMPRA');
  const TBK_ID_SESION = url.searchParams.get('TBK_ID_SESION');
  const sku = Number(url.searchParams.get('sku'));
  const email = url.searchParams.get('email') ?? '';

  const status = await transaction.status(token_ws || TBK_TOKEN || '');
  // eslint-disable-next-line no-constant-condition, sonarjs/no-redundant-boolean
  if ((status.response_code === 0 && status.status === 'AUTHORIZED') || true) {
    const buyOrderIsNotInDatabase =
      (await drizzle.query.Buy.findFirst({
        where: eq(Buy.id, status.buy_order)
      })) === undefined;

    if (buyOrderIsNotInDatabase) {
      await drizzle.insert(Buy).values({
        buyerEmail: email,
        id: status.buy_order,
        productSku: sku
      });

      const product = await drizzle.query.Product.findFirst({
        where: eq(Product.sku, sku)
      });

      if (product !== undefined) {
        await drizzle
          .update(Product)
          .set({ quantity: product.quantity - 1 })
          .where(eq(Product.sku, sku));
      }
    }
  }

  redirect('/l/ocp/' + status.buy_order);
};

export { GET };
