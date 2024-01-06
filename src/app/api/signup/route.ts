import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getToken } from 'next-auth/jwt';

import drizzle from '../../../../lib/drizzle';
import { User } from '../../../../lib/drizzle/schema';

const GET = async (request: Request) => {
  const token = await getToken({ req: request as any });
  if (typeof token?.email !== 'string' || typeof token?.name !== 'string')
    redirect('/');

  const userDoesNotExist =
    (await drizzle.query.User.findFirst({
      where: eq(User.email, token.email)
    })) === undefined;

  if (userDoesNotExist) {
    await drizzle.insert(User).values({
      email: token.email,
      name: token.name
    });
    redirect('/l/profile');
  }

  redirect('/l/plp');
};

export { GET };
