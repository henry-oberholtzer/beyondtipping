import Restaurant from "./Restaurant";
import { Link } from "react-router-dom";
import { useLoaderData } from 'react-router'

type RestaurantItemList = Restaurant[]

const RestaurantList: React.FC = () => {
  const restaurants = useLoaderData() as RestaurantItemList

  return (
    <div>
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
