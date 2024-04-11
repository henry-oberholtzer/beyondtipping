import Restaurant from "./Restaurant";
import { useLoaderData } from 'react-router-dom';

export default function RestaurantDetail() {
  const data = useLoaderData() as Restaurant

  return (
    <Restaurant 
      name={data.name}
      address={data.address}
      imageUrl={data.imageUrl}
      website={data.website}
      id={data.id}
    />
  )
}
