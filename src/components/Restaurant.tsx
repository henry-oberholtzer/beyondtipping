interface RestaurantProps {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  website: string;
}

const Restaurant: React.FC<RestaurantProps> = ({ name, address, id, website, imageUrl }) => {

  return (
    <>
      <div id={`Restaurant: ${id}`}>
        <h3>{name}</h3>
        <img src={imageUrl} alt="Restaurant logo" height="100px"/>
        <p>Address: {address}</p>
        <a href={website}>Website</a>
        <hr />
      </div>
    </>
  );
}
export default Restaurant;