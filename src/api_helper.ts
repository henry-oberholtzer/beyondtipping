const server = () => {
  if (!import.meta.env.NODE_ENV || import.meta.env.NODE_ENV === "production") {
    return "http://127.0.0.1:8000/";
  }

const apiServer = api(server())
const get = apiServer("GET");
const post = apiServer("POST")

export const getRestaurants = (id?: number) => get("restaurants", id)
export const getTypes = (id?: number) => get("types", id)
export const createRestaurant = (body: Restaurant) => post("restaurants", null, body)

