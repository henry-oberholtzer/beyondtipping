export const Form = () => {
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submission behavior

        // Extracting values from input fields
        const name = document.getElementById("restaurantName").value;
        const address = document.getElementById("restaurantAddress").value;
        const type_id = document.getElementById("restaurantType").value;

        // Creating the object
        const restaurantData = {
            name: name,
            address: address,
            type_id: parseInt(type_id) // Converting type_id to an integer
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