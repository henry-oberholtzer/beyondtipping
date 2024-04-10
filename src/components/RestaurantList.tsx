import Restaurant from "./Restaurant";

interface RestaurantListProps {
  restaurants: {
    id: number;
    name: string;
    address: string;
    imageUrl: string;
    website: string;
    // type_id: number;
  }[];
  onRestaurantClick: (id: number) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onRestaurantClick }) => {

  return (
    <div>
      <h2>Restaurant List renders HERE</h2>
      <hr />
      {restaurants.map((restaurant) => (
        <Restaurant
          key={restaurant.id}
          name={restaurant.name}
          address={restaurant.address}
          imageUrl={restaurant.imageUrl}
          website={restaurant.website}
          whenRestaurantClicked={() => onRestaurantClick(restaurant.id)}
          id={restaurant.id}
        />
      ))}
      <hr />
    </div>

  );
}
export default RestaurantList;