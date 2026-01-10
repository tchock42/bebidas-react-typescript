// src/setupTests.ts
import '@testing-library/jest-dom';

// Opcional: Limpieza automática después de cada test (Vitest suele hacerlo solo, pero esto asegura)
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});