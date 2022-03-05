import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import windiCSS from 'vite-plugin-windicss';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  plugins: [solidPlugin(), windiCSS(), Icons({ compiler: 'solid' })],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
