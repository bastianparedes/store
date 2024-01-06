/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import Page from '../page';

describe('Page', () => {
  it('renders Page component', () => {
    const { container } = render(<Page />);

    expect(container).toMatchSnapshot();
    expect(screen.getByLabelText(/Nombre del producto:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cantidad disponible:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Precio:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Imagen:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(<Page />);

    fireEvent.change(screen.getByLabelText(/Nombre del producto:/i), {
      target: { value: 'Producto de prueba' }
    });
    fireEvent.change(screen.getByLabelText(/Descripción:/i), {
      target: { value: 'Descripción de prueba' }
    });
    fireEvent.change(screen.getByLabelText(/Cantidad disponible:/i), {
      target: { value: '5' }
    });
    fireEvent.change(screen.getByLabelText(/Precio:/i), {
      target: { value: '50' }
    });

    const file = new File(['(⌐□_□)'], 'test-file.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText(/Imagen:/i), {
      target: { files: [file] }
    });

    expect((screen.getByLabelText(/Nombre del producto:/i) as any).value).toBe(
      'Producto de prueba'
    );
    expect((screen.getByLabelText(/Descripción:/i) as any).value).toBe(
      'Descripción de prueba'
    );
    expect((screen.getByLabelText(/Cantidad disponible:/i) as any).value).toBe(
      '5'
    );
    expect((screen.getByLabelText(/Precio:/i) as any).value).toBe('50');
  });

  it('handles submit success', async () => {
    global.fetch = jest
      .fn()
      .mockReturnValueOnce({ json: async () => ({ success: true }), ok: true });
    global.alert = jest.fn();
    Object.defineProperty(window, 'location', {
      value: {
        assign: jest.fn(),
        hash: {
          endsWith: jest.fn(),
          includes: jest.fn()
        }
      },
      writable: true
    });

    render(<Page />);

    fireEvent.change(screen.getByLabelText(/Nombre del producto:/i), {
      target: { value: 'Producto de prueba' }
    });
    fireEvent.change(screen.getByLabelText(/Descripción:/i), {
      target: { value: 'Descripción de prueba' }
    });
    fireEvent.change(screen.getByLabelText(/Cantidad disponible:/i), {
      target: { value: '5' }
    });
    fireEvent.change(screen.getByLabelText(/Precio:/i), {
      target: { value: '50' }
    });

    const file = new File(['(⌐□_□)'], 'test-file.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText(/Imagen:/i), {
      target: { files: [file] }
    });

    const submitButton = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(window.location.pathname).toBe('/l/plp');
    });
  });

  it('handles submit fail', async () => {
    global.fetch = jest.fn().mockReturnValueOnce({
      json: async () => ({ success: false }),
      ok: true
    });
    global.alert = jest.fn();
    Object.defineProperty(window, 'location', {
      value: {
        assign: jest.fn(),
        hash: {
          endsWith: jest.fn(),
          includes: jest.fn()
        }
      },
      writable: true
    });

    window.location.pathname = '/l/rpp';

    render(<Page />);

    fireEvent.change(screen.getByLabelText(/Nombre del producto:/i), {
      target: { value: 'Producto de prueba' }
    });
    fireEvent.change(screen.getByLabelText(/Descripción:/i), {
      target: { value: 'Descripción de prueba' }
    });
    fireEvent.change(screen.getByLabelText(/Cantidad disponible:/i), {
      target: { value: '5' }
    });
    fireEvent.change(screen.getByLabelText(/Precio:/i), {
      target: { value: '50' }
    });

    const file = new File(['(⌐□_□)'], 'test-file.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText(/Imagen:/i), {
      target: { files: [file] }
    });

    const submitButton = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(window.location.pathname).toBe('/l/rpp');
    });
  });
});
