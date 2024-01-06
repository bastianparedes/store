import { getToken } from 'next-auth/jwt';

import drizzle from '../../../../lib/drizzle';
import { Exchange } from '../../../../lib/drizzle/schema';

const POST = async (request: Request) => {
  const token = await getToken({ req: request as any });
  if (typeof token?.email !== 'string')
    return new Response(JSON.stringify({ success: false }), { status: 404 });

  const body = await request.json();

  const { message, productSkuOffered, productSkuWanted } = body;

  if (typeof message !== 'string' || message.trim() === '')
    return new Response(
      JSON.stringify({
        message: 'No se envió un mensaje',
        success: false
      })
    );

  if (
    typeof productSkuOffered !== 'number' ||
    typeof productSkuWanted !== 'number'
  )
    return new Response(
      JSON.stringify({
        message: 'Los productos enviados no existen',
        success: false
      })
    );

  await drizzle.insert(Exchange).values({
    message: message,
    productOfferedSku: productSkuOffered,
    productRequestedSku: productSkuWanted,
    resolveDate: null,
    status: 'proposed'
  });

  return new Response(
    JSON.stringify({ message: 'Intercambio ofrecido con éxito', success: true })
  );
};

export { POST };
