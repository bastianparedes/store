import React from 'react';

import './styles/global.css';
import './styles/normalize.css';
import SessionProvider from './common/Session';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es-ES">
      <head>
        <meta charSet="utf-8" />
        {/* <link href="/favicon.ico" rel="icon" /> */}
        <title>Geek Store</title>
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
