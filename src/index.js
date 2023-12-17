import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Overview from "./components/overview";
import Balances from "./components/balances";
import Transactions from "./components/transactions";
import Categories from "./components/categories";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/overview",
        element: <Overview />
    },
    {
        path: "/balances",
        element: <Balances />
    },
    {
        path: "/transactions",
        element: <Transactions />
    },
    {
        path: "/categories",
        element: <Categories />
    }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
