export interface Restaurant {
  name: string;
  address: string;
  website: string;
  imageUrl: string;
  latitude: Float32Array;
  longitude: Float32Array;
  type_id: number;
}
export interface Type {
  name: string;
  amount: string;
}

// all users can access
export async function getRestaurants() {
  try {
    const response = await fetch('http://127.0.0.1:8000/restaurants', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log('api response:', responseData);
      return responseData;
    } else {
      console.log('api response error:', response.statusText);
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// all users can access
export async function getRestaurantById(id: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/restaurants/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// all users can create, admin needs to change state to visible to be on website
export async function createRestaurant(restaurant: Restaurant) {
  try {
    const response = await fetch('http://127.0.0.1:8000/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurant),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// all users can access
export async function editRestaurant(id: number, updated_restaurant: object) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/restaurants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated_restaurant),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// Admin only access
export async function deleteRestaurant(id: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/restaurants/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// api calls for Types object
// all users can access
export async function getTypes() {
  try {
    const response = await fetch('http://127.0.0.1:8000/types', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// all users can access
export async function getTypeById(id: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/types/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// all users can access
export async function createType(new_type: Type) {
  try {
    const response = await fetch('http://127.0.0.1:8000/types', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(new_type),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// all users can access
export async function editType(id: number, updated_type: object) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/types/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated_type),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// all users can access
export async function deleteType(id: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/types/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}