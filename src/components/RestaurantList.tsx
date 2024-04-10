import { useEffect, useState } from "react";
import Restaurant from "./Restaurant";
import { Link } from "react-router-dom";
import { getRestaurants } from "../api_helper";
// import { useOutletContext } from "react-router-dom";

interface RestaurantListProps {
  name: string;
  id: number;
  address: string;
  website: string;
  imageUrl: string;
}

const RestaurantList: React.FC = () => {
  // const  restaurants = useOutletContext() as Restaurant[];
  
  const [restaurants, setRestaurants] = useState<RestaurantListProps[]>([]);

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

  return (
    <div>
      <h2>Restaurant List renders HERE</h2>
      <hr />
      {restaurants.map((restaurant) => (
        <Link to={`restaurants/${restaurant.id}`} key={restaurant.id}>
          <Restaurant
            key={restaurant.id}
            name={restaurant.name}
            address={restaurant.address}
            imageUrl={restaurant.imageUrl}
            website={restaurant.website}
            id={restaurant.id}
          />
          </Link>
      ))}
          <hr />
        </div>

      );
}
      export default RestaurantList;