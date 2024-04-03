import 'vite/modulepreload-polyfill';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import userRoutes from './components/routes/userRoutes';
import adminRoutes from './components/routes/adminRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      ...userRoutes,
      ...adminRoutes,
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
