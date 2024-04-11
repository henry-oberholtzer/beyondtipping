import "../App.css"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";

import { getRestaurants } from "../api_helper";
import { useState, useEffect } from "react";
import Heading from "./Heading";
import Button from "./Button";

export const Map = () => {
    interface Restaurant {
        id: number;
        name: string;
        address: string;
        website: string;
        imageUrl: string;
        latitude: number;
        longitude: number;
        type_id: number;
    }
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const fetchedRestaurants = await getRestaurants();
                console.log(fetchedRestaurants);
                setRestaurants(fetchedRestaurants);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };
        fetchRestaurants();
    }, []);

    // const markers: { geocode: [number, number]; popUp: string; address: string; websiteUrl: string; imageUrl: string; typeId: number; }[] = [
    //     {
    //         geocode: [45.54178453985534, -122.67473068332497],
    //         popUp: "Bernstein's Bagels",
    //         address: "816 N Russell St, Portland, OR 97227",
    //         websiteUrl: "https://bernsteinsbagels.com/",
    //         imageUrl: "https://static1.squarespace.com/static/58715578e6f2e1d4215c94fb/t/62278b3792539d0c2c8cacab/1646758711651/LOGO.jpg?format=1500w",
    //         typeId: 1
    //     },
    //     {
    //         geocode: [45.589974368346105, -122.75392355397106],
    //         popUp: "Gracie's Apizza",
    //         address: "7304 N Leavitt Ave, Portland, OR 97203",
    //         websiteUrl: "https://www.graciesapizza.com/",
    //         imageUrl: "https://images.squarespace-cdn.com/content/v1/5a790307b7411c447f906450/0c65fe57-4201-4a29-9f93-a89252bf9760/Gracie%27s+Apizza+Round+12+inch+%28no+white%29.png",
    //         typeId: 1
    //     },
    //     {
    //         geocode: [45.51691301771276, -122.640913069314],
    //         popUp: "Mirisata",
    //         address: "2420 SE Belmont St, Portland, OR 97214",
    //         websiteUrl: "https://mirisata.com/",
    //         imageUrl: "https://mirisata.com/cdn/shop/files/Mirisata_Header_300x300.png?v=1613789790",
    //         typeId: 1
    //     },
    //     {
    //         geocode: [45.51637079485203, -122.65459971534298],
    //         popUp: "Kachka",
    //         address: "960 SE 11th Ave, Portland, OR 97214",
    //         websiteUrl: "https://www.kachkapdx.com/menus",
    //         imageUrl: "https://images.squarespace-cdn.com/content/v1/6425fda37cd955140101b1b9/ada3a486-8c67-486c-bb5f-cabc02282403/Kachka_0342.jpg",
    //         typeId: 4
    //     },
    //     {
    //         geocode: [45.52829802597582, -122.69451466931405],
    //         popUp: "Scottie's Pizza Parlor NW",
    //         address: "685 NW 21st Ave, Portland, OR 97209",
    //         websiteUrl: "https://www.scottiespizzaparlor.com/",
    //         imageUrl: "https://static.wixstatic.com/media/e4f34f_a76b3cc99f7745d59f07304c15575626~mv2.png/v1/fill/w_2500,h_1818,al_c/e4f34f_a76b3cc99f7745d59f07304c15575626~mv2.png",
    //         typeId: 3
    //     },
    //     {
    //         geocode: [45.50519758833178, -122.64288511642539],
    //         popUp: "Scottie's Pizza Parlor SE",
    //         address: "2128 SE Division St, Portland, OR 97202",
    //         websiteUrl: "https://www.scottiespizzaparlor.com/",
    //         imageUrl: "https://static.wixstatic.com/media/e4f34f_a76b3cc99f7745d59f07304c15575626~mv2.png/v1/fill/w_2500,h_1818,al_c/e4f34f_a76b3cc99f7745d59f07304c15575626~mv2.png",
    //         typeId: 3
    //     },
    //     {
    //         geocode: [45.56198197080319, -122.6619204],
    //         popUp: "Masala Lab PDX",
    //         address: "5237 NE Martin Luther King Jr Blvd, Portland, OR 97211",
    //         websiteUrl: "https://masalalabpdx.com/",
    //         imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdSfbkTXPh6hXT4XVMGQF1UjE5MBukuiZJN-o8QCXZBw&s",
    //         typeId: 1
    //     },
    //     {
    //         geocode: [45.517281442933665, -122.65144143068598],
    //         popUp: "Astera",
    //         address: "1407 SE Belmont St, Portland, OR 97214",
    //         websiteUrl: "https://www.asterapdx.com/",
    //         imageUrl: "https://images.squarespace-cdn.com/content/v1/6553de6b1f32c47e5b7fbc02/34029aa4-2087-4c3b-880c-71a2a32ebaf9/IMG_7877.JPG",
    //         typeId: 1
    //     },
    //     {
    //         geocode: [45.478770425239595, -122.69428179259911],
    //         popUp: "Gigi's Cafe",
    //         address: "6320 SW Capitol Hwy, Portland, OR 97239",
    //         websiteUrl: "https://gigiscafepdx.com/",
    //         imageUrl: "https://gigiscafepdx.com/wp-content/uploads/2019/03/block-img-landscape1.jpg",
    //         typeId: 1
    //     },
    //     {
    //         geocode: [45.522208697575685, -122.678663284657],
    //         popUp: "El Gaucho",
    //         address: "319 SW Broadway, Portland, OR 97205",
    //         websiteUrl: "https://elgaucho.com/portland/",
    //         imageUrl: "https://elgaucho.com/wp-content/uploads/el-gaucho-portland.jpg",
    //         typeId: 3
    //     },
    //     {
    //         geocode: [45.50539680925617, -122.62954903862807],
    //         popUp: "Ava Gene's",
    //         address: "3377 SE Division St, Portland, OR 97202",
    //         websiteUrl: "https://www.avagenes.com/",
    //         imageUrl: "https://s3.amazonaws.com/arc-wordpress-client-uploads/wweek/wp-content/uploads/2017/10/30141957/RG17_AvaGenes_HenryCromett02.jpg",
    //         typeId: 3
    //     },
    //     {
    //         geocode: [45.5516389366529, -122.66165400794208],
    //         popUp: "Cafe Olli",
    //         address: "3925 NE Martin Luther King Jr Blvd, Portland, OR 97212",
    //         websiteUrl: "https://cafeolli.com/",
    //         imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9fwubBUSuwdnyRTkX5yYZcndkdnZos-yVjc9dluG6ZA&s",
    //         typeId: 3
    //     }
    // ];

    interface TypeData {
        [key: number]: { name: string; amount: string };
    }

    const typeData: TypeData = {
        1: { name: 'Flat Fee', amount: '' },
        2: { name: 'Service Fee', amount: '18%' },
        3: { name: 'Service Fee', amount: '20%' },
        4: { name: 'Service Fee', amount: '22%' },
        6: { name: 'Service Fee', amount: 'other' },
    };

    restaurants.forEach(restaurant => {
        restaurant.latitude -= 0.00034;
    });

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448653.png",
        // iconUrl: require("./img/restaurant.png"),
        iconSize: [38, 38]
    })

    return (
        <>
          <div className="text-center mb-8 md:mb-10">
      <Heading as="h1" size="xl" className="font-bold mt-12 w-max">
        tip-free restaurants map
      </Heading>
      </div>
      <p className="text-xl text-center font-body max-w mb-5 px-5">find restaurants in PDX that have integrated fare wages and foregone tipping!</p>
      <div className="text-center mb-8 md:mb-10">
      <Button to="/restaurants" buttonText="view restaurant list" className="mb-8 md:mb-10" />
      </div>
            <MapContainer center={[45.512794, -122.679565]} zoom={13}>
                {/* <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> */}
                <TileLayer
                    attribution="Google Maps"
                    // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
                    // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
                    url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
                    maxZoom={20}
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
                <MarkerClusterGroup>
                    {restaurants.map(restaurant => (

                        <Marker position={[restaurant.latitude, restaurant.longitude]} icon={customIcon}>
                            <Popup>
                                <div className="popup">
                                    <h2>{restaurant.name}</h2>
                                    <img src={restaurant.imageUrl} alt="restaurant" />
                                    <div className="addressAndFeeType">
                                        <h3>{typeData[restaurant.type_id].amount} {typeData[restaurant.type_id].name}</h3>
                                        <p>{restaurant.address}</p>
                                    </div>
                                    <div className="links">
                                        <a href={restaurant.website} target="_blank" rel="noopener noreferrer">Website</a>
                                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.address}`} target="_blank" rel="noopener noreferrer">Directions</a>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>

                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </>
    );
}