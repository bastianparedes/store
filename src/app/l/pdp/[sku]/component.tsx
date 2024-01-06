/* eslint-disable no-alert */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';

import styles from './styles.module.scss';

interface Props {
  creation: {
    token: string;
    url: string;
  };
  watcherEmail: string;
  product: {
    name: string;
    description: string;
    ownerEmail: string;
    price: number;
    quantity: number;
    sku: number;
  };
  watcherProducts: {
    name: string;
    description: string;
    ownerEmail: string;
    price: number;
    quantity: number;
    sku: number;
  }[];
}

const ProductListPage = ({
  creation,
  watcherEmail,
  product,
  watcherProducts
}: Props) => {
  const [selectValue, setSelectValue] = useState(
    watcherProducts[0]?.sku ?? NaN
  );

  const [textOffer, setTextOffer] = useState('');
  const handleOnTextOfferChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextOffer(event.target.value);
  };

  const watcherIsOwner = watcherEmail === product.ownerEmail;

  const selectOnChangeHandler = (event: any) => {
    setSelectValue(Number(event.target.value));
  };

  const handleTransferOffer = () => {
    (async () => {
      const response = await fetch('/api/offer', {
        body: JSON.stringify({
          message: textOffer,
          productSkuOffered: selectValue,
          productSkuWanted: product.sku
        }),
        method: 'POST'
      });

      if (!response.ok) {
        alert('Ocurrió un error inesperado. Inténtelo mas tarde');
        return;
      }

      const json = await response.json();

      alert(json.message);
      if (json.success === true) window.location.pathname = '/l/management';
    })();
  };

  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <div className={styles.imageContainer}>
          <img src={'/api/image/' + product.sku} alt={product.name} />
        </div>
        <div className={styles.productInfo}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>SKU: {product.sku}</p>
          <p>Cantidad disponible: {product.quantity}</p>
          <p>Precio: ${product.price}</p>
          <form action={creation.url} method="POST">
            <input type="hidden" name="token_ws" value={creation.token} />
            {!watcherIsOwner ? (
              <button className={styles.button} type="submit">
                Comprar
              </button>
            ) : null}
          </form>
          {!watcherIsOwner && watcherProducts.length > 0 ? (
            <div className={styles.containerOffer}>
              <select
                className={styles.selectOffer}
                id="opciones"
                name="opciones"
                onChange={selectOnChangeHandler}
                value={selectValue}
              >
                {watcherProducts.map((watcherProduct) => (
                  <option key={watcherProduct.sku} value={watcherProduct.sku}>
                    {watcherProduct.name}
                  </option>
                ))}
              </select>
              <textarea
                value={textOffer}
                onChange={handleOnTextOfferChange}
                rows={4}
                cols={50}
              />
              <button
                className={styles.buttonOffer}
                onClick={handleTransferOffer}
              >
                Ofrecer intercambio
              </button>
            </div>
          ) : null}
          {!watcherIsOwner ? (
            <a
              className={styles.sendMessage}
              href={`mailto:${product.ownerEmail}`}
            >
              Enviar mensaje
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
