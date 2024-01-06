/* eslint-disable no-console */
/* eslint-disable no-alert */
'use client';

import React, { useState } from 'react';

import styles from './styles.module.scss';

interface Props {
  address: string;
  city: string;
  country: string;
  phone: string;
}

const Component = ({
  address: initialAddress,
  city: initialCity,
  country: initialCountry,
  phone: initialPhone
}: Props) => {
  const [formData, setFormData] = useState({
    address: initialAddress,
    city: initialCity,
    country: initialCountry,
    phone: initialPhone
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/updateUser', {
      body: JSON.stringify(formData),
      method: 'POST'
    });

    if (!response.ok) alert('Ha ocurrido un error');
    const json = await response.json();
    alert(json.message);
  };

  return (
    <>
      <h1 className={styles.title}>Datos del usuario</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          País:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ciudad:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Dirección:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Número de Celular:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+569 1111 1111"
          />
        </label>
        <br />
        <button type="submit">Guardar</button>
      </form>
    </>
  );
};

export default Component;
