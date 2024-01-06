import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';

import styles from './styles.module.scss';
import drizzle from '../../../../lib/drizzle';
import { Rating } from '../../../../lib/drizzle/schema';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email as string;

  const ratings = await drizzle.query.Rating.findMany({
    columns: {
      id: false,
      ownerEmail: false
    },
    where: eq(Rating.ownerEmail, email)
  });

  const sumStars = ratings.reduce(
    (acumulator, element) => {
      return {
        stars1: acumulator.stars1 + element.stars1,
        stars2: acumulator.stars2 + element.stars2,
        stars3: acumulator.stars3 + element.stars3
      };
    },
    {
      stars1: 0,
      stars2: 0,
      stars3: 0
    }
  );

  const averageStars = {
    stars1: Math.floor(
      sumStars.stars1 / (ratings.length === 0 ? 1 : ratings.length)
    ),
    stars2: Math.floor(
      sumStars.stars2 / (ratings.length === 0 ? 1 : ratings.length)
    ),
    stars3: Math.floor(
      sumStars.stars3 / (ratings.length === 0 ? 1 : ratings.length)
    )
  };

  return (
    <>
      <h1 className={styles.title}>Evaluaciones</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>
              <p>
                ¿Qué tan satisfecho estás hoy con tu experiencia en la tienda?
              </p>
              <span>Promedio estrellas: {averageStars.stars1}</span>
            </th>
            <th>
              <p>
                ¿Qué tan probable es que recomiendes “unabgeek.shop” a otras
                personas?
              </p>
              <span>Promedio estrellas: {averageStars.stars2}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>
                <p>Estrellas: {rating.stars1}</p>
                <p>{rating.comment1}</p>
              </td>
              <td>
                <p>Estrellas: {rating.stars2}</p>
                <p>{rating.comment2}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
