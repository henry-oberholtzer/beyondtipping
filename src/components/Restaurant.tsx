interface RestaurantProps {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  website: string;
  whenRestaurantClicked: (id: number) => void;
}

const Restaurant: React.FC<RestaurantProps> = ({ name, address, id, website, imageUrl,whenRestaurantClicked }) => {

  return (
    <>
      <div onClick={() => whenRestaurantClicked(id)}>
        <h3>{name}</h3>
        <img src={imageUrl} alt="Restaurant logo" height="100px"/>
        <p>Address: {address}</p>
        <a href={website}>Website</a>
        {/* <p>{type_id}</p> */}
        <hr />
      </div>
    </>
  );
}
export default Restaurant;