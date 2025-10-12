# React + TypeScript + Vite

To start project development, run:

```bash
  npm run dev
```

### 🚀 How to Use Formatters and Linters

Format all files:

```bash
  npm run format
```

Check formatting:

```bash
  npm run format:check
```

Lint with formatting: (now includes Prettier rules)

```bash
  npm run lint
```

Auto-fix linting issues:

```bash
  npm run lint:fix
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 🚀 Services used in this project

### 🚀 Google maps JS API

This project uses the Google Maps JavaScript API. To enable it, follow these steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to the "APIs & Services" section and click on "Enable APIs and Services."
4. Search for "Maps JavaScript API" and enable it for your project.
5. Go to the "Credentials" section and create an API key.
6. Restrict the API key to enhance security by specifying HTTP referrers or IP addresses.
7. Copy the API key and add it to your project's environment variables (e.g., in a `.env` file) as `VITE_GOOGLE_MAPS_API_KEY=your_api_key
8. Use the API key in your application to load the Google Maps JavaScript API.
9. Make sure to monitor your usage and set up billing if necessary, as the Google Maps API may have associated costs based on usage.
10. Refer to the [Google Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript/overview) for more details on how to use the API in your project.

in your `index.html`, add the following script tag, replacing `[your_key]` with your actual API key:

```
    <script
      src="https://maps.googleapis.com/maps/api/js?key=[your_key]=maps,marker"
      defer
    ></script>
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
