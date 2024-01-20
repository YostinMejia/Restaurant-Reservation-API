
# Restaurant Reservation API Documentation

## Table of Contents

1. [Introduction](#1-introduction)
2. [Authentication](#2-authentication)
3. [Rate Limiting](#3-rate-limiting)
4. [User Registration](#4-user-registration)
5. [User Login](#5-user-login)
6. [Search Restaurants](#6-search-restaurants)
7. [User Profile](#7-user-profile)
8. [Cart Management](#8-cart-management)
9. [Table Reservations](#9-table-reservations)
10. [Error Handling](#10-error-handling)
11. [Not Found](#11-not-found)
12. [Advanced Usage](#12-advanced-usage)

## 1. Introduction

Welcome to the Restaurant Reservation API! This API allows users to search for restaurants, make table reservations, and manage their profiles. This documentation details the available filters and how to effectively use them to get specific results.

## 2. Authentication

All endpoints, except for user registration and login, require authentication. Use a Bearer Token in the Authorization header.

## 3. Rate Limiting

Requests are rate-limited to prevent abuse. The default limit is 100 requests per IP every 10 minutes.

## 4. User Registration

- **Endpoint:** `POST /api/v1/auth/register`
- **Description:** Register a new user account.
- **Body (example):**
  ```json
  {
   "birthDay": "1998-06-01",
   "name":"jane",
  "lastName": "smith",
    "location": {
    "address": "123 Oak St",
    "neighborhood": "Downtown",
    "city": "New York",
    "state": "New York"
  },
  "contact": {
    "phone": {
      "number": "123456789",
      "prefix": "+1"
    }
  },
  "rol": "user",
  "email": "jane.smith@example.com",
  "password": "Password1"
    }

  ```
- **Response (success):**
  ```json
  {
    "returns the user"
  }
  ```

## 5. User Login

- **Endpoint:** `POST /api/v1/auth/login`
- **Description:** Log in with an existing user account.
- **Body (example):**
  ```json
  {
   "email": "jane.smith@example.com",
  "password": "Password1"
  }
  ```
- **Response (success):**
  ```json
  {
    "token": "yourAccessToken",
  }
  ```

## 6. Search Restaurants


## Base URL for Filtering

```
host/api/v1/search
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
host/api/v1/search?tag=restaurant&type=thematic&location=city_medellin&operationTime=open>=12:00&perPage=10
```

This request searches for thematic restaurants in the city of Medellín, opening after 12:00, and displays 10 results per page.

### Example 2: Filter Restaurants by Name and Location

```
host/api/v1/search?tag=restaurant&query=mindset&location=state_antioquia
```

This request filters restaurants that have "mindset" in their name and are located in the state of Antioquia.

## Important Notes

- Ensure to provide parameters correctly and in the specified format for accurate results.
- Filtering logic is applied jointly (AND) for multiple filters.

---

## 7. User Profile

- **Endpoint:** `PATCH /api/v1/user/`
- **Authorization Header Required.**
- **Description:** Update the user's profile information.
- **Body (example):**
  ```json
  {
    "name": "Updated Name",
    "lastName": "Updated Last Name",
    "birthDay": "1990-05-15",
    "location": {
      "address": "Updated Address",
      "neighborhood": "Updated Neighborhood",
      "city": "Updated City",
      "state": "Updated State"
    },
    "contact": {
      "phone": {
        "number": "555-555-5555",
        "prefix": "+1"
      }
    }
  }
  ```
- **Response (success):**
  ```json
  {
    "returns the user updated"
  }
  ```

## 8. Cart Management

- **Endpoint:** `/api/v1/user/cart`
- **Authorization Header Required.**
- **Description:** Manage the user's cart.


### Endpoint

```https
GET /api/v1/user/cart
```

### Description

Retrieve the user's cart, including reservations.

### Request

- Headers
  - Authorization: Bearer `accessToken`

### Response (success)

```json
{
  "reservations": [
    {
      "_id": "reservationId",
      "date": "2024-01-31T12:00:00.000Z",
      "endTime": 780, //Time in minutes 780/60 = 13:00 (24 hours * 60) 
      "peopleArrive": 2,
      "notes": "Optional notes"
    },
    // ... other reservations
  ],
}
```

## Get One Reservation from Cart

### Endpoint

```https
GET /api/v1/user/cart/:idReservation
```

### Description

Retrieve details of a specific reservation from the user's cart.

### Request

- Headers
  - Authorization: Bearer `accessToken`

### Response (success)

```json
{
  "_id": "reservationId",
  "date": "2024-01-31T12:00:00.000Z",
   "endTime": 780, //Time in minutes 780/60 = 13:00 (24 hours * 60) 
  "peopleArrive": 2,
  "notes": "Optional notes",
}
```

## Confirm Reservation

### Endpoint

```https
POST /api/v1/user/cart/:idReservation
```

### Description

Confirm and move a reservation from the cart to the user's confirmed reservations.

### Request

- Headers
  - Authorization: Bearer `accessToken`

### Response (success)

```json
{
  "message": "Reservation confirmed",
  "reservation": {
    "_id": "reservationId",
    "date": "2024-01-31T12:00:00.000Z",
     "endTime": 780, //Time in minutes 780/60 = 13:00 (24 hours * 60) 
    "peopleArrive": 2,
    "notes": "Optional notes"
  }
}
```

## Delete Reservation from Cart

### Endpoint

```https
DELETE /api/v1/user/cart/:idReservation
```

### Description

Delete a reservation identified by `idReservation` from the user's cart.

### Request

- Headers
  - Authorization: Bearer `accessToken`

### Response (success)

```json
{
  "message": "Reservation identified by: reservationId deleted.",
}
```

# Reservation Schema

```json
{
  "_id": "reservationId",
  "date": "2024-01-31T12:00:00.000Z",
   "endTime": 780, //Time in minutes 780/60 = 13:00 (24 hours * 60) 
  "peopleArrive": 2,
  "notes": "Optional notes"
}
```

This schema represents a reservation object with specific properties:

- `date`: The date and time of the reservation.
- `endTime`: The end time of the reservation in minutes.
- `peopleArrive`: The number of people for the reservation.
- `notes`: Optional notes for the reservation.


# API for CRUD Operations on Restaurants, Tables, and Reservations

The API provides CRUD operations to manage restaurants, tables, and reservations. The URL structure to access specific functions is as follows:

```
https://{host}/api/v1/restaurants/:idRestaurant/tables/:idTable/reservations/:idReservation
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
      "url": "https://example.com"
    },
    "operationTime": {
      "open": 600,  //Time in minutes 780/60 = 13:00 (24 hours * 60) 
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
        "url": "https://example.com"
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
      "url": "https://example.com"
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
        "url": "https://example.com"
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

### 9. **Add a reservation to the user's cart.**

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
        "phoneNumber": "+123456789"
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
        "phoneNumber": "+123456789"
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
          "phoneNumber": "+123456789"
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
## 10. Error Handling

- **Invalid Token:**
  ```json
  {
    "error": "Authentication invalid",
    "success": false
  }
  ```

- **Resource Not Found:**
  ```json
  {
    "error": "Table not found",
    "success": false
  }
  ```

- **Unauthorized Access:**
  ```json
  {
    "error": "Unauthorized",
    "success": false
  }
  ```

- **Validation Errors:**
  ```json
  {
    "error": "Validation failed: Name is required, Opening time is required",
    "success": false
  }
  ```

## 11. Not Found

- **Endpoint:** `All undefined routes`
- **Description:** Returns a 404 Not Found response.

----