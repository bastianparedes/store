import { eq } from 'drizzle-orm';
import { getToken } from 'next-auth/jwt';

import drizzle from '../../../../lib/drizzle';
import { User } from '../../../../lib/drizzle/schema';

const POST = async (request: Request) => {
  const token = await getToken({ req: request as any });
  if (typeof token?.email !== 'string')
    return new Response(JSON.stringify({ success: false }), { status: 404 });

  const body = await request.json();
  const { address, city, country, phone } = body;

  if (
    typeof address !== 'string' ||
    typeof city !== 'string' ||
    typeof country !== 'string' ||
    typeof phone !== 'string'
  )
    return new Response(
      JSON.stringify({
        message: 'No se enviaron los datos requeridos',
        success: false
      })
    );

  await drizzle
    .update(User)
    .set({
      address: address.trim(),
      city: city.trim(),
      country: country.trim(),
      phone: phone.trim()
    })
    .where(eq(User.email, token.email));

  return new Response(
    JSON.stringify({ message: 'Datos guardados con éxito', success: true })
  );
};

export { POST };
