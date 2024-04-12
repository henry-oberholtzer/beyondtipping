import { useEffect, useState } from "react";
import Restaurant from "./Restaurant";
import { useLoaderData } from 'react-router'

import { getTypes } from "../api_helper";
import Heading from "./Heading";
import CallToAction from "./CallToAction";

type Restaurant = {
  name: string;
  id: number;
  address: string;
  website: string;
  imageUrl: string;
  type_id: number;
  visible: boolean;
}
interface TypeData {
  id: number;
  name: string;
  amount: string;
}

type RestaurantItemList = Restaurant[]

const RestaurantList: React.FC = () => {
  const restaurants = useLoaderData() as RestaurantItemList;
  const visibleRestaurants = restaurants.filter(restaurant => restaurant.visible);
  const [types, setTypes] = useState<any[]>([]);
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const fetchTypes = async () => {
      const allTypes = await getTypes();
      const typesMap = allTypes.reduce((map: { [key: number]: TypeData }, type: TypeData) => ({ ...map, [type.id]: type }), {});
      setTypes(restaurants.map((restaurant) => typesMap[restaurant.type_id]));
    };
    fetchTypes();
  }, [restaurants]);

  const filteredRestaurants = visibleRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
    restaurant.address.toLowerCase().includes(filterTerm.toLowerCase())
  );

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
               
      </div>
      
      <div className="grid w-full h-10 bg-gray-900 rounded-lg place-items-center">
        <div className="w-72">
          <div className="relative w-full min-w-[200px]">
            <input
              type="text"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
              placeholder="filter list..."
              className="peer w-full rounded-[7px] border border-white bg-transparent px-3 py-2 text-md  !text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-1">
        {filteredRestaurants.map((restaurant, index) => (
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
        ))}
      </div>
      <CallToAction/>

    </>
  );
}
export default RestaurantList;