'use client';

import React from 'react';

import { signOut, useSession } from 'next-auth/react';

import styles from './styles.module.scss';

const Header = () => {
  const session = useSession();

  const onLogout = async () => {
    await signOut({
      callbackUrl: '/'
    });
  };

  const name = session?.data?.user?.name;
  const nameExists = typeof name === 'string';

  return (
    <div className={styles.header}>
      <span>Bienvenido{nameExists ? ', ' + name : ''}</span>
      <button onClick={onLogout}>Cerrar Sesión</button>
      <a href="/l/profile">Perfil</a>
      <a href="/l/plp">Ver Productos</a>
      <a href="/l/rpp">Registrar Producto</a>
      <a href="/l/management">Gestión</a>
      <a href="/l/ratings">Evaluaciones</a>
    </div>
  );
};

export default Header;
