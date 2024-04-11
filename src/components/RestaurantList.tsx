import { useEffect, useState } from "react";
import Restaurant from "./Restaurant";
import { useLoaderData } from 'react-router'
import { getTypes } from "../api_helper";
import Heading from "./Heading";
import Button from "./Button";

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
  const restaurants = useLoaderData() as RestaurantItemList
  const [types, setTypes] = useState<any[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const allTypes = await getTypes();
      const typesMap = allTypes.reduce((map: { [key: number]: TypeData }, type: TypeData) => ({ ...map, [type.id]: type }), {});
      setTypes(restaurants.map((restaurant) => typesMap[restaurant.type_id]));
    };
    fetchTypes();
  }, [restaurants]);

  return (
    <>
    <div className="text-center mb-8 md:mb-10">
      <Heading as="h1" size="xl" className="font-bold mt-12 w-max">
        tip-free restaurants list
      </Heading>
      </div>
      <p className="text-xl text-center font-body max-w mb-5 px-5">find restaurants in PDX that have integrated fare wages and foregone tipping!</p>
      <div className="text-center mb-8 md:mb-10">
      <Button to="/map" buttonText="view restaurant map" className="mb-8 md:mb-10" />
      </div>
      <div className="mx-auto p-4 max-w-sm">
        <input type="text" placeholder="search..." />
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
