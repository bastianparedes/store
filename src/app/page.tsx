'use client';

import { signIn } from 'next-auth/react';

import styles from './styles.module.scss';

const Page = () => {
  const handleLogIn = () => {
    signIn();
  };

  return (
    <div className={styles.container}>
      <h1>Bienvenido a Geek Store</h1>
      <p>
        Bienvenido a <b>Geek Store</b>, tu destino definitivo para la compra y
        venta de de productos geek relacionados con videojuegos, juegos de mesa
        y anime. Sumérgete en nuestro extenso catálogo, que abarca desde los
        retro hasta los últimos lanzamientos de videojuegos, emocionantes juegos
        de mesa y una amplia colección de artículos de anime y manga. En Geek
        Store, nos enorgullece ofrecer productos auténticos y de alta calidad,
        respaldados por vendedores confiables, para que puedas expresar tu amor
        por la cultura geek con estilo. Nuestra comunidad vibrante te brinda la
        oportunidad de conectarte con otros aficionados, compartir experiencias
        y descubrir nuevas pasiones. Con una interfaz intuitiva y opciones de
        compra seguras, en Geek Store no solo adquieres productos, sino que
        también te sumerges en una experiencia única que celebra tu geek
        interior. ¡Descubre lo mejor del mundo geek con nosotros!
      </p>
      <button onClick={handleLogIn}>Iniciar sesión</button>
    </div>
  );
};

export default Page;
