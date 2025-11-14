import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'html-env-replace',
        transformIndexHtml(html) {
          return html.replace(
            /__VITE_GOOGLE_MAPS_API_KEY__/g,
            env.VITE_GOOGLE_MAPS_API_KEY || ''
          );
        },
      },
    ],
  };
});
