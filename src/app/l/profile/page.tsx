import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';

import Component from './component';
import drizzle from '../../../../lib/drizzle';
import { User } from '../../../../lib/drizzle/schema';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email as string;

  const user = await drizzle.query.User.findFirst({
    where: eq(User.email, email)
  });

  if (user === undefined) redirect('/');

  return (
    <Component
      address={user.address}
      city={user.city}
      country={user.country}
      phone={user.phone}
    />
  );
}
