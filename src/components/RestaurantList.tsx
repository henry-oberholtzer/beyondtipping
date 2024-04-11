import Restaurant from "./Restaurant";
import { Link } from "react-router-dom";
import { useLoaderData } from 'react-router'


type Restaurant = {
  name: string;
  id: number;
  address: string;
  website: string;
  imageUrl: string;
}

type RestaurantItemList = Restaurant[]

const RestaurantList: React.FC = () => {
  const restaurants = useLoaderData() as RestaurantItemList

  return (
    <>
      <div className="mx-auto p-4 max-w-sm">
      <input type="text" placeholder="search..." />
      </div>
    
    <div className="flex flex-wrap justify-center mt-1">
      {restaurants.map((restaurant) => (
        // <Link to={`restaurants/${restaurant.id}`} key={restaurant.id}>
          <Restaurant
            key={restaurant.id}
            name={restaurant.name}
            address={restaurant.address}
            imageUrl={restaurant.imageUrl}
            website={restaurant.website}
            id={restaurant.id}
          />
          // </Link>
      ))}
      </div>
     
    </>
      );
}
export default RestaurantList;
