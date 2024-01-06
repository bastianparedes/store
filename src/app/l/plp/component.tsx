/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';

import './styles.scss';
import styles from './styles.module.scss';

interface Props {
  products: {
    name: string;
    description: string;
    ownerEmail: string;
    price: number;
    quantity: number;
    sku: number;
  }[];
}

const ProductListPage = ({ products: initialProducts }: Props) => {
  const [filterByName, setFilterByName] = useState('');
  const [filterByMinPrice, setFilterByMinPrice] = useState(0);
  const [filterByMaxPrice, setFilterByMaxPrice] = useState(1000000);

  const products = initialProducts.filter(
    (product) =>
      product.name.includes(filterByName) &&
      filterByMinPrice <= product.price &&
      product.price <= filterByMaxPrice
  );
  const thereAreProducts = products.length > 0;
  return (
    <div className={styles.pseudoBody}>
      <div className={styles.container}>
        <h1>{thereAreProducts ? 'Catálogo' : 'Sin productos disponibles'}</h1>
        <div className={styles.productList}>
          {products.map((product) => (
            <div key={product.sku} className={styles.productItem}>
              <a href={'/l/pdp/' + String(product.sku)}>
                <img
                  src={'/api/image/' + String(product.sku)}
                  alt={product.name}
                />
              </a>
              <p>Nombre: {product.name}</p>
              <p>Precio: ${product.price}</p>
              <p>Cantidad disponible: {product.quantity}</p>
            </div>
          ))}
        </div>
      </div>
      <aside className={styles.aside}>
        <h3>Filtros</h3>
        <div className={styles.filterContainer}>
          <h5>Nombre</h5>
          <input
            type="text"
            onChange={(e: any) => setFilterByName(e.target.value)}
            value={filterByName}
          />
        </div>
        <div className={styles.filterContainer}>
          <h5>Precio mínimo</h5>
          <input
            min={0}
            onChange={(e: any) => setFilterByMinPrice(Number(e.target.value))}
            type="number"
            value={filterByMinPrice}
          />
        </div>
        <div className={styles.filterContainer}>
          <h5>Precio máximo</h5>
          <input
            min={0}
            onChange={(e: any) => setFilterByMaxPrice(Number(e.target.value))}
            type="number"
            value={filterByMaxPrice}
          />
        </div>
      </aside>
    </div>
  );
};

export default ProductListPage;
