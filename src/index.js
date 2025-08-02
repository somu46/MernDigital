import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from './Pages';
import ThankYou from './Pages/LandingPage/ThankYou'; // Ensure the thankYouPage component is correctly referenced
const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/lp/full-stack-webdevelopment-and-digital-marketing',
    element: <LandingPage />,
  },
  {
    path: '/thank-you',
    element: <ThankYou />, // Correctly reference the thankYou component
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<RouterProvider router={Routes} >

  </RouterProvider>
);
