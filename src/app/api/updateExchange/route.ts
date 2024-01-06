import { eq } from 'drizzle-orm';
import { getToken } from 'next-auth/jwt';

import drizzle from '../../../../lib/drizzle';
import { Exchange } from '../../../../lib/drizzle/schema';

const POST = async (request: Request) => {
  const token = await getToken({ req: request as any });
  if (typeof token?.email !== 'string')
    return new Response(JSON.stringify({ success: false }), { status: 404 });

  const body = await request.json();

  const { id, newStatus } = body;

  if (
    typeof id !== 'number' ||
    (newStatus !== 'accepted' && newStatus !== 'rejected')
  )
    return new Response(
      JSON.stringify({
        message: 'Se debe enviar un id y un status válido',
        success: false
      })
    );

  const exchange = await drizzle.query.Exchange.findFirst({
    where: eq(Exchange.id, id)
  });

  if (exchange === undefined)
    return new Response(
      JSON.stringify({
        message: 'No existe la propuesta de intercambio',
        success: false
      })
    );

  if (exchange.status !== 'proposed')
    return new Response(
      JSON.stringify({
        message: 'La propuesta de intercambio ya ha finalizado',
        success: false
      })
    );

  await drizzle
    .update(Exchange)
    .set({
      resolveDate: new Date(),
      status: newStatus
    })
    .where(eq(Exchange.id, id));

  const message =
    'La propuesta de intercambio ha sido ' +
    (newStatus === 'accepted' ? 'aceptada' : 'borrada');

  return new Response(
    JSON.stringify({
      message,
      success: true
    })
  );
};

export { POST };
