/* eslint-disable no-alert */
/* eslint-disable no-console */
'use client';

import React, { useState } from 'react';

import styles from './styles.module.scss';
import './styles.scss';

interface FormData {
  quantity: number;
  description: string;
  picture: File | null;
  name: string;
  price: number;
}

export default function Formulario() {
  const [formData, setFormData] = useState<FormData>({
    description: '',
    name: '',
    picture: null,
    price: 1000,
    quantity: 1
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        picture: e.target.files[0]
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('quantity', formData.quantity.toString());
    formDataToSend.append('price', formData.price.toString());
    if (formData.picture) {
      formDataToSend.append('picture', formData.picture);
    }

    const response = await fetch('/api/rpp', {
      body: formDataToSend,
      method: 'POST'
    });

    if (response.ok && (await response.json()).success) {
      alert('Producto registrado con éxito');
      window.location.pathname = '/l/plp';
    } else alert('Ha ocurrido un error al intentar registrar el producto');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Nombre del producto:
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="description">
          Descripción:
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="quantity">
          Cantidad disponible:
          <input
            id="quantity"
            type="number"
            min={0}
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="price">
          Precio:
          <input
            id="price"
            type="number"
            max={999999}
            min={0}
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="image">
          Imagen:
          <input
            id="image"
            type="file"
            name="picture"
            onChange={handleFileChange}
          />
        </label>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
