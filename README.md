# Release Notes - Geek Store Versión 1.0.0

## Introducción
Esta versión **1.0.0** de Geek Store introduce nuevas características. Introduce todo el sistema de autenticación, registrador y buscador con filtros de productos, pasarela de pago, confirmación de pago, intercambio de productos y visualización de productos e intercabmios.

## Nuevas Características
- *Pasarela de autenticación*: Ahora se puede realizar autenticación mediante la pasarela de google. Se definieron las rutas protegias que serán inaccesibles para usuarios desconocidos.
- *Registro de productos*: Usuarios autenticados pueden ingresar los datos y foto del producto para que sea visible para otros clientes.
- *Visualización de productos*: Existe la página de catálogo que muestra la información de los productos, solo se muestran los filtrados por nombre y precio. También se agregó la página de detalle del producto donde se muestra la información completa del mismo.
- *Pasarela de pago*: Se agregó la posiblidad de comprar un producto desde la página de detalle. Se ingresa a la pasarela de WebPay Plus y al volver a nuestra aplicación se visualiza el detalla del vendedor, comprador y producto comprado
- *Posibilidad de intercambios*: Se agregó el sistema de intercabmios de productos disponibles entre usuarios.
- *Envío de mensajes*: Se agregó la posibilidad de enviar mensajes a otros clientes a travéz de la página de detalle de productos.
- *Gestión*: Se agregó la posibilidad de visualizar toda la información del cliente mediante una página que la resume en tablas y da la posibilidad de descargarla en un archivo **.xslx**.

## Mejoras
- *Estética*: Mejoras en la estética de la aplicación web.
- *ORM*: Se introdujo el ORM Drizzle para generar un esquema que modela la base de datos y restringe las peticiones al mismo mediante tipos.

## Correcciones de Errores
- *Sistema de almacenamiento de archivos*: Se introdujo un sistema de almacenamiento de archivos separado de la aplicación web para almacenar las imágenes de los productos. Esto elimina el error al trabajar en sistemas que no permiten la modificación de los archivos.

## Problemas Conocidos
- *Archivos no se guardan*: En sistemas que no permiten la modificación de archivos no permiten guardar las fotos de los productos.

## Instrucciones de Instalación en local
1. Instala e inicia [Docker](https://www.docker.com/products/docker-desktop/)
2. Clona este repositorio
3. Abre una terminal y ubícate dentro del respositorio clonado
4. Ejecuta el comando `docker compose up` en la terminal
5. Abre [localhost:3000](http://localhost:3000/)

## Información de Contacto
Para más información o soporte, contacta a b.paredespadget@uandresbello.edu.
