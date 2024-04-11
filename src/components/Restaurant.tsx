interface RestaurantProps {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  website: string;
}

const Restaurant: React.FC<RestaurantProps> = ({ name, address, website, imageUrl }) => {

  return (
    <div className="p-4 max-w-sm">
      <div className="max-w-4xl m-2 shadow-xl md:px-12 px-4 py-12 grid place-items-center rounded-lg bg-gradient-to-br from-rose-800 via-slate to-gray-500">

        <a href={website}><img src={imageUrl} alt="Restaurant logo" height="256px" width="256px" />
          <br />
          <h3>{name}</h3>
          <p>{address}</p></a>
        <p>link to directions?</p>
        <p>type of service fee</p>
      </div>
    </div>
  );
}
export default Restaurant;