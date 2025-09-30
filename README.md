# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend connectivity / API base URL

The frontend expects an API base URL to call. By default the project falls back to `http://localhost:8080` but you can configure it using a Vite environment variable.

- Create a file named `.env` in the project root and add:

	VITE_API_BASE_URL="http://localhost:8080"

- Or point it to a remote server:

	VITE_API_BASE_URL="https://api.example.com"

If you don't set this variable the app will use `http://localhost:8080` as a fallback which will cause a connection refused error if no backend is running there.

If you see errors like `GET http://localhost:8080/... net::ERR_CONNECTION_REFUSED` then either:

- Start your backend on the configured host/port. (Check your backend docs.)
- Or set `VITE_API_BASE_URL` to the correct URL and restart the dev server (`npm run dev`).

Running the frontend (PowerShell):

	npm install; npm run dev
