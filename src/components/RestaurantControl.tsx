//NOTE. this was imported and rendered via App.tsx. i removed that code to merge this and set up new render with router plan

import { useState, useEffect } from "react";
// import { Route, Routes, useNavigate } from 'react-router-dom';
import RestaurantList from "./RestaurantList";
import { getRestaurants, getRestaurantById } from "../api_helper";

interface RestaurantList {
  name: string;
  id: number;
  address: string;
  website: string;
  imageUrl: string;
}

const RestaurantControl = () => {
  const [restaurants, setRestaurants] = useState<RestaurantList[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants();
        setRestaurants(response);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchRestaurants();
  }, []);
  //detail page NOT set up yet
  const handleDetailClick = async (id: number) => {
    try {
      const restaurant = await getRestaurantById(id);
      setSelectedRestaurant(restaurant);
      // navigate(`/restaurants/${id}`);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  return (
    <>
      {/* <Routes>
        <Route path='/' element={<Auth />} /> 
        <Route path="/restaurants"
          element={<RestaurantList restaurants={restaurants} onRestaurantClick={handleDetailClick} />} />
      </Routes> */}
      {restaurants === null && (
        <div><h3>No restaurants have been added yet..</h3></div>
      )}
      {!selectedRestaurant && restaurants != null && (
        <div>
          <hr />
          <RestaurantList
            restaurants={restaurants}
            onRestaurantClick={handleDetailClick}
          />
        </div>
      )}
    </>
  );
}
export default RestaurantControl;