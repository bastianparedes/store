import { getToken } from 'next-auth/jwt';

import drizzle from '../../../../lib/drizzle';
import { Product } from '../../../../lib/drizzle/schema';
import minioClient from '../../../../lib/minio';

const POST = async (request: Request) => {
  const token = await getToken({ req: request as any });
  if (typeof token?.email !== 'string')
    return new Response(JSON.stringify({ success: false }), { status: 404 });

  // Se rescata la información enviada del producto
  const data = await request.formData();
  const file: File | null = data.get('picture') as unknown as File;

  // Se responde con error 404 si no se adjuntó una foto
  if (!file) {
    return new Response(JSON.stringify({ success: false }), { status: 404 });
  }

  // Se guarda la información del producto en la base de datos
  const result = await drizzle
    .insert(Product)
    .values({
      description: data.get('description')?.toString() as string,
      name: data.get('name')?.toString() as string,
      ownerEmail: token.email,
      price: Number(data.get('price')) as number,
      quantity: Number(data.get('quantity')) as number
    })
    .returning();

  // Se guarda la foto en el sistema de almacenamiento de archivos
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await minioClient.putObject('static', result[0].sku + '.png', buffer);

  // Se responde al usuario con 200
  return new Response(JSON.stringify({ success: true }));
};

export { POST };
