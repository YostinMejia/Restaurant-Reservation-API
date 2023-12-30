
---

# Restaurant Search API

## Description

The Restaurant Search API provides powerful functionalities to search and filter restaurants based on various criteria such as type, location, name, and operating hours. This documentation details the available filters and how to effectively use them to get specific results.

## Base URL for Filtering

```
localhost:3000/api/v1/search
```

## Available Filters

### 1. **Tag**

- **Parameter:** `tag`
- **Description:** Specifies the type of entity being searched.
- **Example Usage:** `tag=restaurant`

### 2. **Restaurant Type**

- **Parameter:** `type`
- **Description:** Filters restaurants based on their type.
- **Example Usage:** `type=fast food,dinner,thematic`

### 3. **Restaurant Name**

- **Parameter:** `query`
- **Description:** Filters results based on a search term in the restaurant name.
- **Example Usage:** `query=mindset`

### 4. **Restaurant Location**

- **Parameter:** `location`
- **Description:** Filters by city, state, or neighborhood.
- **Example Usage:** `location=city_medellin,state_antioquia,neighborhood_asad`

### 5. **Operating Hour Range**

- **Parameter:** `operationTime`
- **Description:** Filters based on the restaurant's opening and closing hours.
- **Example Usage:** `operationTime=open>=12:00,close<=16:00`

### 6. **Pagination**

- **Parameters:** `pages` and `perPage`
- **Description:** Specifies the number of data packets and results per page, respectively.
- **Example Usage:** `pages=2&perPage=10`

## Combined Usage Examples

### Example 1: Search Thematic Restaurants Open After 12:00 in Medellín

```
localhost:3000/api/v1/search?tag=restaurant&type=thematic&location=city_medellin&operationTime=open>=12:00&perPage=10
```

This request searches for thematic restaurants in the city of Medellín, opening after 12:00, and displays 10 results per page.

### Example 2: Filter Restaurants by Name and Location

```
localhost:3000/api/v1/search?tag=restaurant&query=mindset&location=state_antioquia
```

This request filters restaurants that have "mindset" in their name and are located in the state of Antioquia.

## Important Notes

- Ensure to provide parameters correctly and in the specified format for accurate results.
- Filtering logic is applied jointly (AND) for multiple filters.

---


Of course, here is an enhanced documentation for CRUD operations on restaurant, table, and reservation entities, using the information provided in the models and the structure of the routes:

---

# API for CRUD Operations on Restaurants, Tables, and Reservations

The API provides CRUD operations to manage restaurants, tables, and reservations. The URL structure to access specific functions is as follows:

```
localhost:3000/api/v1/restaurants/:idRestaurant/tables/:idTable/reservations/:idReservation
```

## CRUD Operations

### 1. **Create a New Restaurant**

- **Method:** `POST`
- **URL:** `/api/v1/restaurants`
- **Example Request Body:**
  ```json
  {
    "name": "New Restaurant",
    "type": "fast food",
    "contact": {
      "phone": {
        "number": "123456789",
        "prefix": "+1"
      },
      "url": "http://example.com"
    },
    "operationTime": {
      "open": 600,
      "close": 1200
    },
    "location": {
      "address": "123 Main Street",
      "neighborhood": "Example Neighborhood",
      "city": "Example City",
      "state": "Example State"
    }
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Restaurant created successfully",
    "restaurant": {
      "_id": "Restaurant_ID",
      "name": "New Restaurant",
      "type": "fast food",
      "contact": {
        "phone": {
          "number": "123456789",
          "prefix": "+1"
        },
        "url": "http://example.com"
      },
      "operationTime": {
        "open": 600,
        "close": 1200
      },
      "location": {
        "address": "123 Main Street",
        "neighborhood": "Example Neighborhood",
        "city": "Example City",
        "state": "Example State"
      }
    }
  }
  ```

### 2. **Get Details of a Specific Restaurant**

- **Method:** `GET`
- **URL:** `/api/v1/restaurants/:idRestaurant`
- **Successful Response:**
  ```json
  {
    "_id": "Restaurant_ID",
    "name": "Restaurant Name",
    "type": "Restaurant Type",
    "contact": {
      "phone": {
        "number": "123456789",
        "prefix": "+1"
      },
      "url": "http://example.com"
    },
    "operationTime": {
      "open": 600,
      "close": 1200
    },
    "location": {
      "address": "123 Main Street",
      "neighborhood": "Example Neighborhood",
      "city": "Example City",
      "state": "Example State"
    }
  }
  ```

### 3. **Update Information of a Restaurant**

- **Method:** `PATCH`
- **URL:** `/api/v1/restaurants/:idRestaurant`
- **Example Request Body:**
  ```json
  {
    "name": "New Name",
    "location": {
      "city": "New City"
    }
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Restaurant information updated successfully",
    "restaurant": {
      "_id": "Restaurant_ID",
      "name": "New Name",
      "type": "fast food",
      "contact": {
        "phone": {
          "number": "123456789",
          "prefix": "+1"
        },
        "url": "http://example.com"
      },
      "operationTime": {
        "open": 600,
        "close": 1200
      },
      "location": {
        "address": "123 Main Street",
        "neighborhood": "Example Neighborhood",
        "city": "New City",
        "state": "Example State"
      }
    }
  }
  ```

### 4. **Delete a Restaurant**

- **Method:** `DELETE`
- **URL:** `/api/v1/restaurants/:idRestaurant`
- **Successful Response:**
  ```json
  {
    "message": "Restaurant deleted successfully"
  }
  ```

---

### 5. **Add a New Table to a Restaurant**

- **Method:** `POST`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables`
- **Example Request Body:**
  ```json
  {
    "numberOfTable": 1,
    "status": "available",
    "capacity": 4
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Table added successfully",
    "table": {
      "_id": "Table_ID",
      "numberOfTable": 1,
      "status": "available",
      "capacity": 4
    }
  }
  ```

### 6. **Get Details of a Specific Table in a Restaurant**

- **Method:** `GET`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable`
- **Successful Response:**
  ```json
  {
    "_id": "Table_ID",
    "numberOfTable": 1,
    "status": "available",
    "capacity": 4
  }
  ```

### 7. **Update Information of a Table in a Restaurant**

- **Method:** `PATCH`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable`
- **Example Request Body:**
  ```json
  {
    "numberOfTable": 2
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Table information updated successfully",
    "table": {
      "_id": "Table_ID",
      "numberOfTable": 2,
      "status": "available",
      "capacity": 4
    }
  }
  ```

### 8. **Delete a Table from a Restaurant**

- **Method:** `DELETE`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable`
- **Successful Response:**
  ```json
  {
    "message": "Table deleted successfully"
  }
  ```

---

### 9. **Create a New Reservation on a Table in a Restaurant**

- **Method:** `POST`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable/reservations`
- **Example Request Body:**
  ```json
  {
    "client": {
      "name": "Client Name",
      "birthDay": "1990-01-01",
      "contact": {
        "email": "client@example.com",
        "phoneNumber": "+123456789",
        "instagram": "http://instagram.com/client"
      }
    },
    "date": "2023-01-01T14:00:00",
    "endTime": 120,
    "peopleArrive": 4,
    "notes": "Additional Notes"
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Reservation created successfully",
    "reservation": {
      "_id": "Reservation_ID",
      "client": {
        "name": "Client Name",
        "birthDay": "1990-01-01",
        "contact": {
          "email": "client@example.com",
          "phoneNumber": "+123456789",
          "instagram": "http://instagram.com/client"
        }
      },
      "date": "2023-01-01T14:00:00",
      "endTime": 120,
      "peopleArrive": 4,
      "notes": "Additional Notes"
    }
  }
  ```

### 10. **Get Details of a Specific Reservation on a Table in a Restaurant**

- **Method:** `GET`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable/reservations/:idReservation`
- **Successful Response:**
  ```json
  {
    "_id": "Reservation_ID",
    "client": {
      "name": "Client Name",
      "birthDay": "1990-01-01",
      "contact": {
        "email": "client@example.com",
        "phoneNumber": "+123456789",
        "instagram": "http://instagram.com/client"
      }
    },
    "date": "2023-01-01T14:00:00",
    "endTime": 120,
    "peopleArrive": 4,
    "notes": "Additional Notes"
  }
  ```

### 11. **Update Information of a Reservation on a Table in a Restaurant**

- **Method:** `PATCH`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable/reservations/:idReservation`
- **Example Request Body:**
  ```json
  {
    "client": {
      "name": "New Name",
      "contact": {
        "email": "new_client@example.com"
      }
    },
    "date": "2023-01-01T15:30:00",
    "peopleArrive": 6,
    "notes": "Updated Notes"
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Reservation information updated successfully",
    "reservation": {
      "_id": "Reservation_ID",
      "client": {
        "name": "New Name",
        "birthDay": "1990-01-01",
        "contact": {
          "email": "new_client@example.com",
          "phoneNumber": "+123456789",
          "instagram": "http://instagram.com/client"
        }
      },
      "date": "2023-01-01T15:30:00",
      "peopleArrive": 6,
      "notes": "Updated Notes"
    }
  }
  ```

### 12. **Delete a Reservation from a Table in a Restaurant**

- **Method:** `DELETE`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable/reservations/:idReservation`
- **Successful Response:**
  ```json
  {
    "message": "Reservation deleted successfully"
  }
  ```

---

---

# API for CRUD Operations on Restaurants, Tables, and Reservations

The API provides CRUD operations to manage restaurants, tables, and reservations. The URL structure to access specific functions is as follows:

```
localhost:3000/api/v1/restaurants/:idRestaurant/tables/:idTable/reservations/:idReservation
```

## CRUD Operations

### 1. **Create a New Restaurant**

- **Method:** `POST`
- **URL:** `/api/v1/restaurants`
- **Example Request Body:**
  ```json
  {
    "name": "New Restaurant",
    "type": "fast food",
    "contact": {
      "phone": {
        "number": "123456789",
        "prefix": "+1"
      },
      "url": "http://example.com"
    },
    "operationTime": {
      "open": 600,
      "close": 1200
    },
    "location": {
      "address": "123 Main Street",
      "neighborhood": "Example Neighborhood",
      "city": "Example City",
      "state": "Example State"
    }
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Restaurant created successfully",
    "restaurant": {
      "_id": "Restaurant_ID",
      "name": "New Restaurant",
      "type": "fast food",
      "contact": {
        "phone": {
          "number": "123456789",
          "prefix": "+1"
        },
        "url": "http://example.com"
      },
      "operationTime": {
        "open": 600,
        "close": 1200
      },
      "location": {
        "address": "123 Main Street",
        "neighborhood": "Example Neighborhood",
        "city": "Example City",
        "state": "Example State"
      }
    }
  }
  ```

### 2. **Get Details of a Specific Restaurant**

- **Method:** `GET`
- **URL:** `/api/v1/restaurants/:idRestaurant`
- **Successful Response:**
  ```json
  {
    "_id": "Restaurant_ID",
    "name": "Restaurant Name",
    "type": "Restaurant Type",
    "contact": {
      "phone": {
        "number": "123456789",
        "prefix": "+1"
      },
      "url": "http://example.com"
    },
    "operationTime": {
      "open": 600,
      "close": 1200
    },
    "location": {
      "address": "123 Main Street",
      "neighborhood": "Example Neighborhood",
      "city": "Example City",
      "state": "Example State"
    }
  }
  ```

### 3. **Update Information of a Restaurant**

- **Method:** `PATCH`
- **URL:** `/api/v1/restaurants/:idRestaurant`
- **Example Request Body:**
  ```json
  {
    "name": "New Name",
    "location": {
      "city": "New City"
    }
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Restaurant information updated successfully",
    "restaurant": {
      "_id": "Restaurant_ID",
      "name": "New Name",
      "type": "fast food",
      "contact": {
        "phone": {
          "number": "123456789",
          "prefix": "+1"
        },
        "url": "http://example.com"
      },
      "operationTime": {
        "open": 600,
        "close": 1200
      },
      "location": {
        "address": "123 Main Street",
        "neighborhood": "Example Neighborhood",
        "city": "New City",
        "state": "Example State"
      }
    }
  }
  ```

### 4. **Delete a Restaurant**

- **Method:** `DELETE`
- **URL:** `/api/v1/restaurants/:idRestaurant`
- **Successful Response:**
  ```json
  {
    "message": "Restaurant deleted successfully"
  }
  ```

---

### 5. **Add a New Table to a Restaurant**

- **Method:** `POST`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables`
- **Example Request Body:**
  ```json
  {
    "numberOfTable": 1,
    "status": "available",
    "capacity": 4
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Table added successfully",
    "table": {
      "_id": "Table_ID",
      "numberOfTable": 1,
      "status": "available",
      "capacity": 4
    }
  }
  ```

### 6. **Get Details of a Specific Table in a Restaurant**

- **Method:** `GET`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable`
- **Successful Response:**
  ```json
  {
    "_id": "Table_ID",
    "numberOfTable": 1,
    "status": "available",
    "capacity": 4
  }
  ```

### 7. **Update Information of a Table in a Restaurant**

- **Method:** `PATCH`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable`
- **Example Request Body:**
  ```json
  {
    "numberOfTable": 2
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Table information updated successfully",
    "table": {
      "_id": "Table_ID",
      "numberOfTable": 2,
      "status": "available",
      "capacity": 4
    }
  }
  ```

### 8. **Delete a Table from a Restaurant**

- **Method:** `DELETE`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable`
- **Successful Response:**
  ```json
  {
    "message": "Table deleted successfully"
  }
  ```

---

### 9. **Create a New Reservation on a Table in a Restaurant**

- **Method:** `POST`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable/reservations`
- **Example Request Body:**
  ```json
  {
    "client": {
      "name": "Client Name",
      "birthDay": "1990-01-01",
      "contact": {
        "email": "client@example.com",
        "phoneNumber": "+123456789",
        "instagram": "http://instagram.com/client"
      }
    },
    "date": "2023-01-01T14:00:00",
    "endTime": 120,
    "peopleArrive": 4,
    "notes": "Additional Notes"
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Reservation created successfully",
    "reservation": {
      "_id": "Reservation_ID",
      "client": {
         "name": "Client Name",
         "birthDay": "1990-01-01",
         "contact": {
            "email": "client@example.com",
            "phoneNumber": "+123456789",
            "instagram": "http://instagram.com/client"
        }
      },
      "date": "2023-01-01T14:00:00",
      "endTime": 120,
      "peopleArrive": 4,
      "notes": "Additional Notes"
    }
  }
  ```

### 10. **Get Details of a Specific Reservation on a Table in a Restaurant**

- **Method:** `GET`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable/reservations/:idReservation`
- **Successful Response:**
  ```json
  {
    "_id": "Reservation_ID",
    "client": {
      "name": "Client Name",
      "birthDay": "1990-01-01",
      "contact": {
        "email": "client@example.com",
        "phoneNumber": "+123456789",
        "instagram": "http://instagram.com/client"
      }
    },
    "date": "2023-01-01T14:00:00",
    "endTime": 120,
    "peopleArrive": 4,
    "notes": "Additional Notes"
  }
  ```

### 11. **Update Information of a Reservation on a Table in a Restaurant**

- **Method:** `PATCH`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable/reservations/:idReservation`
- **Example Request Body:**
  ```json
  {
    "client": {
      "name": "New Name",
      "contact": {
        "email": "new_client@example.com"
      }
    },
    "date": "2023-01-01T15:30:00",
    "peopleArrive": 6,
    "notes": "Updated Notes"
  }
  ```
- **Successful Response:**
  ```json
  {
    "message": "Reservation information updated successfully",
    "reservation": {
      "_id": "Reservation_ID",
      "client": {
        "name": "New Name",
        "birthDay": "1990-01-01",
        "contact": {
          "email": "new_client@example.com",
          "phoneNumber": "+123456789",
          "instagram": "http://instagram.com/client"
        }
      },
      "date": "2023-01-01T15:30:00",
      "peopleArrive": 6,
      "notes": "Updated Notes"
    }
  }
  ```

### 12. **Delete a Reservation from a Table in a Restaurant**

- **Method:** `DELETE`
- **URL:** `/api/v1/restaurants/:idRestaurant/tables/:idTable/reservations/:idReservation`
- **Successful Response:**
  ```json
  {
    "message": "Reservation deleted successfully"
  }
  ```

---



