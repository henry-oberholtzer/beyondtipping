import { createRestaurant } from "../api_helper";
import { FormEvent } from 'react';
import Heading from "./Heading";
import { useNavigate } from "react-router";

export const Form = () => {
    const navigate = useNavigate();
    const apiKey = import.meta.env.VITE_API_KEY;

    const makeCall = async (address: string) => {
        const requestOptions = {
            method: 'GET',
        };
        try {
            const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${apiKey}`, requestOptions)
            if (response.ok) {
                const responseData = await response.json();
                const lat = responseData.features[0].properties.lat;
                const lon = responseData.features[0].properties.lon;
                return [lat, lon];
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    }


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nameElement = document.getElementById("restaurantName") as HTMLInputElement;
        const addressElement = document.getElementById("restaurantAddress") as HTMLInputElement;
        const websiteElement = document.getElementById("restaurantWebsite") as HTMLInputElement;
        const imageURLElement = document.getElementById("restaurantImageURL") as HTMLInputElement;
        const typeElement = document.getElementById("restaurantType") as HTMLSelectElement;

        if (nameElement && addressElement && websiteElement && imageURLElement && typeElement) {
            const name = nameElement.value;
            const address = addressElement.value;
            const website = websiteElement.value;
            const imageUrl = imageURLElement.value;
            const type_id = typeElement.value;

            const [lat, lon] = await makeCall(address);

            const restaurantData = {
                name: name,
                address: address,
                website: website,
                imageUrl: imageUrl,
                type_id: parseInt(type_id),
                latitude: lat,
                longitude: lon,
                visible: false
            };
            createRestaurant(restaurantData);

        } else {
            console.error("One or more elements not found.");
        }
        navigate("/confirmation");
    };

    return (
        <>
            <div className="max-w-4xl m-auto shadow-xl md:px-12 px-4 py-12 grid place-items-center rounded-lg bg-gradient-to-br from-rose-800 via-slate to-gray-500">
                <form id="newRestaurantForm" onSubmit={handleSubmit}>
                    <div id="formInputs">
                        <h1>add new restaurant</h1>
                        <input type="text" className="input" id="restaurantName" name="name" placeholder="Restaurant Name" />
                        <input type="text" className="input" id="restaurantAddress" name="address" placeholder="Restaurant Address" />
                        <input type="text" className="input" id="restaurantWebsite" name="website" placeholder="Restaurant Website" />
                        <input type="text" className="input" id="restaurantImageURL" name="imageURL" placeholder="Restaurant Image URL" />
                        <p>Restaurant Type:</p>
                        <select className="input" id="restaurantType" name="type">
                            <option value="1">Flat Fee</option>
                            <option value="2">18% Service Fee</option>
                            <option value="3">20% Service Fee</option>
                            <option value="4">22% Service Fee</option>
                            <option value="6">Other % Service Fee</option>
                        </select>
                        <button type="submit" id="restaurantSubmit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};