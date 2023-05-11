import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NewCustomer, { action as newCustomerAction } from "./pages/NewCustomer";
import Index, { loader as customersLoader } from "./pages/Index";
import ErrorPage from "./components/ErrorPage";
import EditCustormer from "./pages/EditCustomer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: customersLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/customers/new",
        element: <NewCustomer />,
        action: newCustomerAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/customers/:customersId/edit",
        element: <EditCustormer />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
