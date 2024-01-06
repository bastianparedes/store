import { getToken } from 'next-auth/jwt';

import drizzle from '../../../../lib/drizzle';
import { Rating } from '../../../../lib/drizzle/schema';

const POST = async (request: Request) => {
  const token = await getToken({ req: request as any });
  if (typeof token?.email !== 'string')
    return new Response(JSON.stringify({ success: false }), { status: 404 });

  const body = await request.json();
  const { comment1, comment2, comment3, ownerEmail, stars1, stars2, stars3 } =
    body;

  await drizzle.insert(Rating).values({
    comment1,
    comment2,
    comment3,
    ownerEmail,
    stars1: stars1,
    stars2: stars2,
    stars3: stars3
  });

  return new Response(
    JSON.stringify({ message: 'Evaluación generada con éxito', success: true })
  );
};

export { POST };
