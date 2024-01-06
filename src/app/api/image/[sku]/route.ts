import minioClient from '../../../../../lib/minio';

interface GetParameters {
  params: {
    sku: string;
  };
}

export async function GET(_req: Request, { params: { sku } }: GetParameters) {
  const stream = await minioClient.getObject('static', sku + '.png');
  return new Response(stream as any);
}
