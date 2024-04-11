import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import './index.css'
import RestaurantList from './components/RestaurantList.tsx';
import { getRestaurantById, getRestaurants } from './api_helper.ts';
import { Map } from './components/Map.tsx';
import ErrorPage from './components/ErrorPage.tsx';
import Hero from './views/Hero.tsx';
import RestaurantDetail from './components/RestaurantDetail.tsx';
import Bios from './views/Bio.tsx';

const navigation: NavigationDir[] = [
  {
    link: "/restaurants",
    label: "restaurant list"
  },
  {
    link: "/map",
    label: "restaurant map"
  },
  {
    link: "/whyTipFree",
    label: "why tip-free?"
  },
  {
    link: "/aboutUs",
    label: "about us"
  }
]

const bios: Bio[] = [
  {
    name: "Henry",
    blurb: "alright alright alright",
    imageUrl: "https://i.discogs.com/-VIUCTR-MBrRCza0B48haB_BPB_RZb1xSfTwMV79SAc/rs:fill/g:sm/q:40/h:500/w:500/czM6Ly9kaXNjb2dz/LXVzZXItYXZhdGFy/cy9VLTIyNTI0NDgt/MTQyMTM5MjYzMi5q/cGVn.jpeg",
    contribution: "Flask Backend, React frontend"
  }
]

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Hero />
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "restaurants",
        element: <RestaurantList />,
        loader: () => {
          return getRestaurants();
        },
      },
      {
        path: "restaurants/:id",
        loader: ({ params }) => {
          if (params.id) {
            return getRestaurantById(parseInt(params.id));
          } else {
            return redirect("/restaurants")
          }
        },
        element: <RestaurantDetail />,
        errorElement: <ErrorPage/>
      },
      {
        path: "/aboutUs",
        element: <Bios />,
        loader: () => {
          return bios
        }
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

export { navigation }
