import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import RestaurantList from './components/RestaurantList.tsx';
import { getRestaurantById, getRestaurants } from './api_helper.ts'
import { Map } from './components/Map.tsx';
import ErrorPage from './components/ErrorPage.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "map",
        element: <Map />,
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
          return getRestaurants();
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
