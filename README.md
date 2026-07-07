# Testing Web Services - Restful Booker API Tests

## Project Description

This project contains API automation tests for the Restful Booker web service.

The API requests were initially tested and debugged using Postman. After validation, the scenarios were implemented in JavaScript using the native Fetch API.

The purpose of this project is to verify REST API functionality by testing authentication, booking creation, retrieving, updating and deleting bookings.

---

## Technologies

- JavaScript (ES Modules)
- Node.js
- Native Fetch API
- Node.js Assert module
- Postman (API request validation and debugging)

---

## API Under Test

**Restful Booker API**

https://restful-booker.herokuapp.com/

**API Documentation**

https://restful-booker.herokuapp.com/apidoc/index.html

---

## Test Scenarios

### 1. Create Authentication Token

**Endpoint**

```
POST /auth
```

**Purpose**

Generate authentication token required for authorized requests.

**Assertions**

- Response status code
- Response headers
- Token existence in response body

---

### 2. Create Booking

**Endpoint**

```
POST /booking
```

**Purpose**

Create a new booking and save the generated booking ID for further API requests.

**Assertions**

- Response status code
- Response headers
- Booking ID existence
- Booking data validation

---

### 3. Get Booking By ID

**Endpoint**

```
GET /booking/{id}
```

**Purpose**

Retrieve booking details using the booking ID created during the booking creation scenario.

**Assertions**

- Response status code
- Response headers
- Booking details validation

---

### 4. Update Booking

**Endpoint**

```
PUT /booking/{id}
```

**Purpose**

Update existing booking information using the authentication token generated during login.

**Assertions**

- Response status code
- Response headers
- Updated booking data validation

---

### 5. Delete Booking

**Endpoint**

```
DELETE /booking/{id}
```

**Purpose**

Delete an existing booking and verify successful removal.

**Assertions**

- Response status code
- Response body


---

## Installation

Clone repository:

```bash
git clone https://github.com/peter-stefanski/WebServices-API-Testing
```

Navigate to the project folder:

```bash
cd Project
```

Install dependencies:

```bash
npm install
```

---

## Running Tests

Run API tests with:

```bash
npm test
```

---

## Test Execution Flow

The complete API test flow:

```
1. Create Authentication Token 
          
2. Create Booking
          
3. Get Booking By ID
          
4. Update Booking
          
5. Delete Booking
```

---

## Assertions

Each API scenario includes validation of:

- HTTP status code
- Response headers
- Response body

The tests verify that API responses match the expected behavior.

---

## Development Process

1. API endpoints were explored using Restful Booker API documentation.
2. Requests were validated and debugged using Postman.
3. API scenarios were automated using JavaScript Fetch API.
4. Assertions were added to validate API responses.
5. Tests can be executed from the command line using npm scripts.

---

## Notes

Postman was used only for API request validation and debugging.

The final automated tests were implemented using native JavaScript Fetch API without additional API testing frameworks.
