const server = () => {
  if (!import.meta.env.NODE_ENV || import.meta.env.NODE_ENV === "production") {
    return "http://127.0.0.1:8000/";
  }
  else
  {
    return import.meta.env.REACT_SERVER as string
  }
}

function api(server: string) {
  return (method: "GET" | "POST" | "PATCH" | "DELETE") => {
    return async (endpoint: string, id?: number | null, body?: object) => {
      try {
        let url = `${server}/${endpoint}`
        if (id != null) {
          url = `${server}/${endpoint}/${id}`
        }
        const request: HttpRequest = {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
        }
        if (body) {
          request.body = JSON.stringify(body)
        }
        const response = await fetch(url, request);
        if (response.ok) {
          const responseData = await response.json();
          return responseData;
        } else {
          throw new Error(`ERROR ${response.status}: Failed to fetch /${endpoint} with response "${response.statusText}`);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        throw error;
      }
    }
  }
}

const apiServer = api(server())
const get = apiServer("GET");
const post = apiServer("POST")

export const getRestaurants = (id?: number) => get("restaurants", id)
export const getTypes = (id?: number) => get("types", id)
export const createRestaurant = (body: Restaurant) => post("restaurants", null, body)
