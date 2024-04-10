import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { getRestaurantById, getRestaurants } from './api_helper.ts';
import RestaurantList from './components/RestaurantList.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />,
    children: [
      {
        path: "map",
        loader: () => {
          return getRestaurants();
        },
      },
      {
        path: "restaurants",
        element: <RestaurantList />,
        // loader: () => {
        //   return getRestaurants();
        // },
      },
      {
        path: "restaurants/:id",
        loader: ({ params }) => {
          return getRestaurantById(params.id)
        },
      },
      {
        path: "/about",
      },
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
