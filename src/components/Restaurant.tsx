interface RestaurantProps {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  website: string;
  typeName: string;
  typeAmount: string;
}

const Restaurant: React.FC<RestaurantProps> = ({ name, address, website, imageUrl, typeName, typeAmount }) => {

  return (
    <div className="p-4 max-w-sm">
      <div className="max-w-4xl m-2 shadow-xl md:px-12 px-4 py-12 grid place-items-center rounded-lg bg-gradient-to-br from-rose-800 via-slate to-gray-500">
        <a href={website} target="_blank" rel="noopener noreferrer"><img src={imageUrl} alt="Restaurant logo" height="256px" width="256px" />
        <br />
        <h3>{name}</h3></a>
        <p>{address}</p>
        <br />
        <p>{typeName} {isNaN(parseFloat(typeAmount)) ? typeAmount : `${Math.round(parseFloat(typeAmount) * 100)}%`}</p>
        <br />
        <p><a href={`https://www.google.com/maps/dir/?api=1&destination=${address}`} target="_blank" rel="noopener noreferrer">let's go!</a></p>
      </div>
    </div>
  );
}
export default Restaurant;