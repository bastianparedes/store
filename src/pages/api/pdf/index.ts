import { eq } from 'drizzle-orm';
import { jsPDF } from 'jspdf';
import type { NextApiRequest, NextApiResponse } from 'next';

import drizzle from '../../../../lib/drizzle';
import { Exchange, Product, User } from '../../../../lib/drizzle/schema';
import minioClient from '../../../../lib/minio';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.json({
      message: 'Petición incorrecta',
      success: false
    });

  const id = req.query.id;
  const idNumber = Number(id);

  if (Number.isNaN(idNumber) || id === undefined)
    return res.json({
      message: 'No se encontró el archivo',
      success: false
    });

  const exchange = await drizzle.query.Exchange.findFirst({
    where: eq(Exchange.id, idNumber)
  });

  if (exchange === undefined)
    return res.json({
      message: 'No se encontró el archivo',
      success: false
    });

  const productOffered = await drizzle.query.Product.findFirst({
    where: eq(Product.sku, exchange.productOfferedSku)
  });

  const productRequested = await drizzle.query.Product.findFirst({
    where: eq(Product.sku, exchange.productRequestedSku)
  });

  if (productOffered === undefined || productRequested === undefined)
    return res.json({
      message: 'Productos no encontrados',
      success: false
    });

  const userOffered = await drizzle.query.User.findFirst({
    where: eq(User.email, productOffered.ownerEmail)
  });

  const userRequested = await drizzle.query.User.findFirst({
    where: eq(User.email, productRequested.ownerEmail)
  });

  if (userOffered === undefined || userRequested === undefined)
    return res.json({
      message: 'Usuarios no encontrados',
      success: false
    });

  const streamImageOffered: Buffer = await new Promise((resolve, reject) => {
    const chunks: any[] = [];
    minioClient.getObject(
      'static',
      productOffered.sku + '.png',
      (err, dataStream) => {
        if (err) {
          reject(err);
        }

        dataStream.on('data', (chunk) => {
          chunks.push(chunk);
        });

        dataStream.on('end', () => {
          resolve(Buffer.concat(chunks));
        });

        dataStream.on('error', (error) => {
          reject(error);
        });
      }
    );
  });

  const streamImageRequested: Buffer = await new Promise((resolve, reject) => {
    const chunks: any[] = [];
    minioClient.getObject(
      'static',
      productRequested.sku + '.png',
      (err, dataStream) => {
        if (err) {
          reject(err);
        }

        dataStream.on('data', (chunk) => {
          chunks.push(chunk);
        });

        dataStream.on('end', () => {
          resolve(Buffer.concat(chunks));
        });

        dataStream.on('error', (error) => {
          reject(error);
        });
      }
    );
  });

  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  (() => {
    const text = 'Comprobante de intercambio';
    pdf.text(text, (pageWidth - pdf.getTextWidth(text)) / 2, 15);
  })();

  const statusTranslation = {
    accepted: 'Aceptado',
    proposed: 'Propuesto',
    rejected: 'Rechazado'
  };

  const texts = [
    {
      content: `${userOffered.name} (${userOffered.email})`,
      title: 'Usuario ofertante'
    },
    {
      content: `${userRequested.name} (${userRequested.email})`,
      title: 'Usuario solicitado'
    },
    {
      content: String(productOffered.sku),
      title: 'ID prod. ofrecido'
    },
    {
      content: productOffered.name,
      title: 'Nombre prod. ofrecido'
    },
    {
      content: String(productRequested.sku),
      title: 'ID prod. solicitado'
    },
    {
      content: productRequested.name,
      title: 'Nombre prod. solicitado'
    },
    { content: statusTranslation[exchange.status], title: 'Estado' },
    {
      content: `${exchange.date.getHours()}:${exchange.date.getMinutes()} - ${exchange.date.getDate()}/${
        exchange.date.getMonth() + 1
      }/${exchange.date.getFullYear()}`,
      title: 'Fecha propuesta'
    }
  ];

  if (exchange.resolveDate !== null)
    texts.push({
      content: `${exchange.resolveDate.getHours()}:${exchange.resolveDate.getMinutes()} - ${exchange.resolveDate.getDate()}/${
        exchange.resolveDate.getMonth() + 1
      }/${exchange.resolveDate.getFullYear()}`,
      title: 'Fecha resolución'
    });

  texts.forEach(({ title, content }, i) => {
    const height = 10 * i + 50;
    pdf.text(title + ':', pageWidth / 3 - pdf.getTextWidth(title) - 2, height);
    pdf.text(content, pageWidth / 3 + 5, height);
  });

  const minHeight = 170;
  (() => {
    pdf.text(
      'Producto ofrecido',
      (pageWidth - pdf.getTextWidth('Producto ofrecido')) / 4,
      minHeight
    );
    pdf.addImage(
      streamImageOffered,
      'PNG',
      10,
      minHeight + 5,
      pageWidth / 3,
      100
    );
  })();

  (() => {
    pdf.text(
      'Producto solicitado',
      ((pageWidth - pdf.getTextWidth('Producto solicitado')) * 3) / 4,
      minHeight
    );
    pdf.addImage(
      streamImageRequested,
      'PNG',
      pageWidth / 2 + 10,
      minHeight + 5,
      pageWidth / 3,
      100
    );
  })();

  const pdfArrayBuffer = pdf.output('arraybuffer');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=${id}.pdf`);
  res.end(Buffer.from(pdfArrayBuffer));
};

export default handler;
