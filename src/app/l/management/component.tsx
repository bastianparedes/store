/* eslint-disable no-console */
/* eslint-disable no-alert */
'use client';

import { FaFilePdf } from 'react-icons/fa';
import { SiMicrosoftexcel } from 'react-icons/si';

import styles from './styles.module.scss';

interface Props {
  productsOwned: {
    name: string;
    price: number;
    quantity: number;
    sku: number;
  }[];
  purchases: {
    date: Date;
    id: string;
    name: string;
    price: number;
    sku: number;
  }[];
  exchangesSent: {
    id: number;
    date: Date;
    resolveDate: Date | null;
    message: string;
    productOfferedSku: number;
    productRequestedSku: number;
    status: 'proposed' | 'rejected' | 'accepted';
    productOffered: {
      name: string;
      description: string;
      ownerEmail: string;
      price: number;
      quantity: number;
      sku: number;
    };
    productRequested: {
      name: string;
      description: string;
      ownerEmail: string;
      price: number;
      quantity: number;
      sku: number;
    };
  }[];
  exchangesReceived: {
    id: number;
    date: Date;
    resolveDate: Date | null;
    message: string;
    productOfferedSku: number;
    productRequestedSku: number;
    status: 'proposed' | 'rejected' | 'accepted';
    productOffered: {
      name: string;
      description: string;
      ownerEmail: string;
      price: number;
      quantity: number;
      sku: number;
    };
    productRequested: {
      name: string;
      description: string;
      ownerEmail: string;
      price: number;
      quantity: number;
      sku: number;
    };
  }[];
  sales: {
    date: Date;
    name: string;
    price: number;
    sku: number;
  }[];
}

const Component = ({
  productsOwned,
  purchases,
  exchangesSent,
  exchangesReceived,
  sales
}: Props) => {
  const statusTranslation = {
    accepted: 'Aceptado',
    proposed: 'Propuesto',
    rejected: 'Rechazado'
  };

  const updateExchange = async (
    id: number,
    newStatus: 'rejected' | 'accepted'
  ) => {
    const response = await fetch('/api/updateExchange', {
      body: JSON.stringify({
        id,
        newStatus
      }),
      method: 'POST'
    });
    const json = await response.json();
    console.log(json);
    alert(json.message);
  };

  const downloadReport = async () => {
    try {
      const response = await fetch('/api/report');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Ocurro un error al descargar el reporte');
    }
  };

  return (
    <>
      <button className={styles.downloadReport} onClick={downloadReport}>
        <SiMicrosoftexcel />
      </button>
      <section className={styles.section}>
        <h1>Mis productos</h1>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>SKU</th>
              <th>Nombre</th>
              <th>Disponible</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
            {productsOwned.length === 0 ? (
              <tr>
                <td colSpan={5}>No hay información para mostrar</td>
              </tr>
            ) : (
              productsOwned.map((productOwned) => (
                <tr key={productOwned.sku}>
                  <td>{productOwned.sku}</td>
                  <td>{productOwned.name}</td>
                  <td>{productOwned.quantity}</td>
                  <td>{productOwned.price}</td>
                  <td>
                    {productOwned.quantity > 0 ? (
                      <button
                        onClick={async () => {
                          await fetch('/api/deleteProduct', {
                            body: JSON.stringify({ sku: productOwned.sku }),
                            method: 'POST'
                          });

                          alert('Producto borrado con éxito');
                        }}
                      >
                        Eliminar producto
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      <section className={styles.section}>
        <h1>Mis ventas</h1>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>SKU</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Precio</th>
            </tr>
            {sales.length === 0 ? (
              <tr>
                <td colSpan={4}>No hay información para mostrar</td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr key={sale.sku}>
                  <td>{sale.sku}</td>
                  <td>{sale.name}</td>
                  <td suppressHydrationWarning>
                    {sale.date.getDate()}/{sale.date.getMonth() + 1}/
                    {sale.date.getFullYear()}
                  </td>
                  <td>{sale.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      <section className={styles.section}>
        <h1>Mis compras</h1>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>ID Compra</th>
              <th>SKU</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Precio</th>
            </tr>
            {purchases.length === 0 ? (
              <tr>
                <td colSpan={5}>No hay información para mostrar</td>
              </tr>
            ) : (
              purchases.map((purchase) => (
                <tr key={purchase.sku}>
                  <td>
                    <a href={'/l/ocp/' + purchase.id}>{purchase.id}</a>
                  </td>
                  <td>{purchase.sku}</td>
                  <td>{purchase.name}</td>
                  <td suppressHydrationWarning>
                    {purchase.date.getDate()}/{purchase.date.getMonth() + 1}/
                    {purchase.date.getFullYear()}
                  </td>
                  <td>{purchase.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      <section className={styles.section}>
        <h1>Intercambios enviados</h1>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th rowSpan={2}>ID</th>
              <th rowSpan={2}>Fecha solicitud</th>
              <th rowSpan={2}>Fecha resolución</th>
              <th rowSpan={2}>Estado</th>
              <th colSpan={2}>Producto ofrecido</th>
              <th colSpan={2}>Producto solicitado</th>
              <th rowSpan={2}>Acción</th>
              <th rowSpan={2}>Mensaje</th>
              <th rowSpan={2}>Acuerdo</th>
            </tr>
            <tr>
              <th>SKU</th>
              <th>Nombre</th>
              <th>SKU</th>
              <th>Nombre</th>
            </tr>
            {exchangesSent.length === 0 ? (
              <tr>
                <td colSpan={11}>No hay información para mostrar</td>
              </tr>
            ) : (
              exchangesSent.map((exchangeSent) => (
                <tr key={exchangeSent.id}>
                  <td>{exchangeSent.id}</td>
                  <td suppressHydrationWarning>
                    {exchangeSent.date.getDate()}/
                    {exchangeSent.date.getMonth() + 1}/
                    {exchangeSent.date.getFullYear()}
                  </td>
                  <td suppressHydrationWarning>
                    {exchangeSent.resolveDate === null
                      ? '-'
                      : `${exchangeSent.resolveDate.getDate()}/${
                          exchangeSent.resolveDate.getMonth() + 1
                        }/${exchangeSent.resolveDate.getFullYear()}`}
                  </td>
                  <td>{statusTranslation[exchangeSent.status]}</td>
                  <td>
                    <a href={'/l/pdp/' + exchangeSent.productOfferedSku}>
                      {exchangeSent.productOffered.sku}
                    </a>
                  </td>
                  <td>
                    <a href={'/l/pdp/' + exchangeSent.productOfferedSku}>
                      {exchangeSent.productOffered.name}
                    </a>
                  </td>
                  <td>
                    <a href={'/l/pdp/' + exchangeSent.productRequestedSku}>
                      {exchangeSent.productRequested.sku}
                    </a>
                  </td>
                  <td>
                    <a href={'/l/pdp/' + exchangeSent.productRequestedSku}>
                      {exchangeSent.productRequested.name}
                    </a>
                  </td>
                  <td>
                    {exchangeSent.status === 'proposed' ? (
                      <button
                        onClick={() =>
                          updateExchange(exchangeSent.id, 'rejected')
                        }
                      >
                        Borrar
                      </button>
                    ) : (
                      <>No hay posibles acciones</>
                    )}
                  </td>
                  <td>{exchangeSent.message}</td>
                  <td>
                    <a
                      href={'/api/pdf?id=' + exchangeSent.id}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <FaFilePdf />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      <section className={styles.section}>
        <h1>Intercambios recibidos</h1>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th rowSpan={2}>ID</th>
              <th rowSpan={2}>Fecha solicitud</th>
              <th rowSpan={2}>Fecha resolución</th>
              <th rowSpan={2}>Estado</th>
              <th colSpan={2}>Producto ofrecido</th>
              <th colSpan={2}>Producto solicitado</th>
              <th rowSpan={2}>Acción</th>
              <th rowSpan={2}>Mensaje</th>
              <th rowSpan={2}>Acuerdo</th>
            </tr>
            <tr>
              <th>SKU</th>
              <th>Nombre</th>
              <th>SKU</th>
              <th>Nombre</th>
            </tr>
            {exchangesReceived.length === 0 ? (
              <tr>
                <td colSpan={11}>No hay información para mostrar</td>
              </tr>
            ) : (
              exchangesReceived.map((exchangeReceived) => (
                <tr key={exchangeReceived.id}>
                  <td>{exchangeReceived.id}</td>
                  <td suppressHydrationWarning>
                    {exchangeReceived.date.getDate()}/
                    {exchangeReceived.date.getMonth() + 1}/
                    {exchangeReceived.date.getFullYear()}
                  </td>
                  <td suppressHydrationWarning>
                    {exchangeReceived.resolveDate === null
                      ? '-'
                      : `${exchangeReceived.resolveDate.getDate()}/${
                          exchangeReceived.resolveDate.getMonth() + 1
                        }/${exchangeReceived.resolveDate.getFullYear()}`}
                  </td>
                  <td>{statusTranslation[exchangeReceived.status]}</td>
                  <td>
                    <a href={'/l/pdp/' + exchangeReceived.productOfferedSku}>
                      {exchangeReceived.productOffered.sku}
                    </a>
                  </td>
                  <td>
                    <a href={'/l/pdp/' + exchangeReceived.productOfferedSku}>
                      {exchangeReceived.productOffered.name}
                    </a>
                  </td>
                  <td>
                    <a href={'/l/pdp/' + exchangeReceived.productRequestedSku}>
                      {exchangeReceived.productRequested.sku}
                    </a>
                  </td>
                  <td>
                    <a href={'/l/pdp/' + exchangeReceived.productRequestedSku}>
                      {exchangeReceived.productRequested.name}
                    </a>
                  </td>
                  <td>
                    {exchangeReceived.status === 'proposed' ? (
                      <>
                        <button
                          onClick={() =>
                            updateExchange(exchangeReceived.id, 'accepted')
                          }
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() =>
                            updateExchange(exchangeReceived.id, 'rejected')
                          }
                        >
                          Rechazar
                        </button>
                      </>
                    ) : (
                      <>No hay posibles acciones</>
                    )}
                  </td>
                  <td>{exchangeReceived.message}</td>
                  <td>
                    <a
                      href={'/api/pdf?id=' + exchangeReceived.id}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <FaFilePdf />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Component;
