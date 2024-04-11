export const Form = () => {

    const apiKey = import.meta.env.VITE_API_KEY;

    const makeCall = async (address) => {
        const requestOptions = {
            method: 'GET',
        };
        try {
            const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${apiKey}`, requestOptions)
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                const lat = responseData.features[0].properties.lat;
                const lon = responseData.features[0].properties.lon;
                console.log(lat);
                console.log(lon);
                return [lat, lon];
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior

        // Extracting values from input fields
        const name = document.getElementById("restaurantName").value;
        const address = document.getElementById("restaurantAddress").value;
        const website = document.getElementById("restaurantWebsite").value; // Extracting website value
        const imageUrl = document.getElementById("restaurantImageURL").value; // Extracting imageURL value
        const type_id = document.getElementById("restaurantType").value;

        // Making the API call to get latitude and longitude
        const [lat, lon] = await makeCall(address);

        // Creating the restaurantData object with latitude and longitude
        const restaurantData = {
            name: name,
            address: address,
            website: website, // Adding website to the object
            imageUrl: imageUrl, // Adding imageURL to the object
            type_id: parseInt(type_id), // Converting type_id to an integer
            latitude: lat,  // Adding latitude to the object
            longitude: lon  // Adding longitude to the object
        };

        // Do whatever you want with the restaurantData object, for example, log it to console
        console.log(restaurantData);
    };

    return (
        <>
            <h1>FORM</h1>
            <form id="newRestaurantForm" onSubmit={handleSubmit}>
                <input type="text" id="restaurantName" name="name" placeholder="Restaurant Name" />
                <input type="text" id="restaurantAddress" name="address" placeholder="Restaurant Address" />
                <input type="text" id="restaurantWebsite" name="website" placeholder="Restaurant Website" />
                <input type="text" id="restaurantImageURL" name="imageURL" placeholder="Restaurant Image URL" />
                <p>Restaurant Type:</p>
                <select id="restaurantType" name="type">
                    <option value="1">Flat Fee</option>
                    <option value="2">18% Service Fee</option>
                    <option value="3">20% Service Fee</option>
                    <option value="4">22% Service Fee</option>
                    <option value="6">Other % Service Fee</option>
                </select>
                <button type="submit" id="restaurantSubmit">Submit</button>
            </form>
        </>
    );
};