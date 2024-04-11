import { useEffect, useState } from "react";
import Restaurant from "./Restaurant";
import { useLoaderData } from 'react-router'
import { getTypes, getRestaurants } from "../api_helper";
import Button from "./Button";
import Heading from "./Heading";

import Button from "./Button";
import Heading from "./Heading";


type Restaurant = {
  name: string;
  id: number;
  address: string;
  website: string;
  imageUrl: string;
  type_id: number;
}
interface TypeData {
  id: number;
  name: string;
  amount: string;
}

type RestaurantItemList = Restaurant[]

const RestaurantList: React.FC = () => {
  const restaurants = useLoaderData() as RestaurantItemList;
  const [types, setTypes] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  //const [restaurants, setRestaurants] = useState(allRestaurants);

  // useEffect(() => {
  //   const fetchRestaurantsAndTypes = async () => {
  //     const response = await fetch(`http://127.0.0.1:8000/restaurants?query=${query}`);
  //     const filterRestaurants = await response.json();

  //     const allTypes = await getTypes();
  //     const typesMap = allTypes.reduce((map: { [key: number]: TypeData }, type: TypeData) => ({ ...map, [type.id]: type }), {});
  //     setTypes(filterRestaurants.map((restaurant: Restaurant) => typesMap[restaurant.type_id]));
  //     setRestaurants(filterRestaurants);
  //   };
  //   fetchRestaurantsAndTypes();
  // }, [query]);

  useEffect(() => {
    const fetchTypes = async () => {
      const allTypes = await getTypes();
      const typesMap = allTypes.reduce((map: { [key: number]: TypeData }, type: TypeData) => ({ ...map, [type.id]: type }), {});
      setTypes(restaurants.map((restaurant) => typesMap[restaurant.type_id]));
    };
    fetchTypes();
  }, [restaurants]);

  // const handleSearch = () => {
  //   setQuery(inputValue);
  // };

  return (
    <>

      <div className="text-center mb-4 md:mb-6">
        <Heading
          as="h1"
          size="xl"
          className="text-center mt-10 font-bold"
          children={<h1>tip-free restaurant list</h1>}
        />
      </div>
      <p className="text-xl text-center font-body max-w mb-10 px-5">find restaurants in PDX that have integrated fare wages and foregone tipping!</p>
      <div className="text-center mb-8 md:mb-10">
        <Button to="/map" buttonText="view restaurant map" className="mb-8 md:mb-10" />
      </div>

      <div className="mx-auto p-4 max-w-sm">
        <input
          className="text-black"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search..." />
        <button>filter list</button>
      </div>
      <div className="flex flex-wrap justify-center mt-1">
        {restaurants.map((restaurant, index) => (
          <Restaurant
            key={restaurant.id}
            name={restaurant.name}
            address={restaurant.address}
            imageUrl={restaurant.imageUrl}
            website={restaurant.website}
            id={restaurant.id}
            typeName={types[index]?.name}
            typeAmount={types[index]?.amount}
          />
          // </Link>
        ))}
      </div>
    </>
  );
}
export default RestaurantList;
