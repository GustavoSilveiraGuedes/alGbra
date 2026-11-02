import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  envDir: '../', // Instruí o Vite a ler o .env na raiz do projeto
});