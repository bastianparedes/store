/* eslint-disable sort-keys */
import { eq, inArray } from 'drizzle-orm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import XLSX from 'xlsx';

import drizzle from '../../../../lib/drizzle';
import { Buy, Exchange, Product, Rating } from '../../../../lib/drizzle/schema';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.json({
      message: 'Petición incorrecta',
      success: false
    });

  const token = await getToken({ req });
  const email = token?.email;
  if (typeof email !== 'string' || typeof token?.name !== 'string')
    return res.send('No autenticado');

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
          where: inArray(Exchange.productOfferedSku, skus)
        });

  const exchangesReceived =
    skus.length === 0
      ? []
      : await drizzle.query.Exchange.findMany({
          where: inArray(Exchange.productRequestedSku, skus)
        });

  const ratings = await drizzle
    .select({
      answer_1: Rating.comment1,
      answer_2: Rating.comment2,
      stars_question_1: Rating.stars1,
      stars_question_2: Rating.stars2
    })
    .from(Rating)
    .where(eq(Rating.ownerEmail, email));

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

  const wb = XLSX.utils.book_new();

  if (productsOwned.length > 0)
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(productsOwned),
      'Productos'
    );

  if (sales.length > 0)
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(sales), 'Ventas');

  if (purchases.length > 0)
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(purchases),
      'Compras'
    );

  if (exchangesSent.length > 0)
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(exchangesSent),
      'Intercambios enviados'
    );

  if (exchangesReceived.length > 0)
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(exchangesReceived),
      'Intercambios recibidos'
    );

  if (ratings.length > 0)
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(ratings),
      'Evaluaciones'
    );

  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet([]), 'empty');

  const file = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
  res.send(file);
};

export default handler;
