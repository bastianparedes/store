/* eslint-disable no-alert */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';

import styles from './styles.module.scss';

interface Props {
  buy: {
    date: Date;
    id: string;
    buyerEmail: string;
    productSku: number;
  };
  product: {
    name: string;
    description: string;
    ownerEmail: string;
    price: number;
    quantity: number;
    sku: number;
  };
}

const ConfirmationPage = ({ buy, product }: Props) => {
  const [rating, setRating] = useState({
    comment1: '',
    comment2: '',
    comment3: '',
    stars1: 0,
    stars2: 0,
    stars3: 0
  });

  const handleChangeRatingComment = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRating({
      ...rating,
      [e.target.name]: e.target.value
    });
  };

  const setStar = (
    attribute: 'stars1' | 'stars2' | 'stars3',
    value: number
  ) => {
    setRating({
      ...rating,
      [attribute]: value
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetch('/api/rate', {
      body: JSON.stringify({ ...rating, ownerEmail: product.ownerEmail }),
      method: 'POST'
    });
    alert('Evaluación generada con éxito');
  };

  const { date } = buy;
  const offset = -4 * 60 * 60 * 1000;
  const fixedDate = new Date(date.getTime() + offset);

  const day = fixedDate.getDate();
  const month = fixedDate.getMonth() + 1;
  const year = fixedDate.getFullYear();
  const dateFormated = `${day}/${month}/${year}`;

  return (
    <>
      <div className={styles.container}>
        <h1>Confirmación de pago</h1>
        <h2>Detalles de la orden</h2>
        <p>
          <strong>Orden de compra:</strong> {buy.id}
        </p>
        <p>
          <strong>Cantidad pagada:</strong> {product.price}
        </p>
        <p>
          <strong>Fecha de compra:</strong> {dateFormated}
        </p>
        <p>
          <strong>Email del comprador:</strong> {buy.buyerEmail}
        </p>
        <p>
          <strong>Email del vendedor:</strong> {product.ownerEmail}
        </p>
        <p>
          <strong>SKU del producto:</strong> {buy.productSku}
        </p>
        <p>
          <strong>Nombre del producto:</strong> {product.name}
        </p>
        <p>
          <strong>Descripción del producto:</strong> {product.description}
        </p>
        <p>
          <strong>Imagen del producto:</strong>
        </p>
        <img
          src={'/api/image/' + product.sku}
          alt={product.name}
          style={{ maxWidth: '300px' }}
        />
      </div>
      <form className={styles.formRating} onSubmit={handleSubmit}>
        <h1>Evalúa al vendedor</h1>
        <div className={styles.containerQuestion}>
          <h2>
            {
              'En una escala del 1 al 5 (siendo 1 muy insatisfecho y 5 muy satisfecho), ¿Qué tan satisfecho estás hoy con tu experiencia en la tienda?'
            }
          </h2>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setStar('stars1', star)}
                style={{
                  color: star <= rating.stars1 ? 'orange' : 'gray',
                  cursor: 'pointer',
                  fontSize: '2rem'
                }}
              >
                &#9733;
              </span>
            ))}
          </div>
          <textarea
            className={styles.comment}
            name="comment1"
            value={rating.comment1}
            onChange={handleChangeRatingComment as any}
            rows={4}
          />
        </div>
        <div className={styles.containerQuestion}>
          <h2>
            {
              'En una escala del 1 al 5 (siendo 1 muy insatisfecho y 5 muy satisfecho), ¿Qué tan probable es que recomiendes “unabgeek.shop” a otras personas?'
            }
          </h2>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setStar('stars2', star)}
                style={{
                  color: star <= rating.stars2 ? 'orange' : 'gray',
                  cursor: 'pointer',
                  fontSize: '2rem'
                }}
              >
                &#9733;
              </span>
            ))}
          </div>
          <textarea
            className={styles.comment}
            name="comment2"
            value={rating.comment2}
            onChange={handleChangeRatingComment as any}
            rows={4}
          />
        </div>
        <button type="submit">Enviar evaluación</button>
      </form>
    </>
  );
};

export default ConfirmationPage;
