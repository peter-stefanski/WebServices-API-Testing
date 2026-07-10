# Testing Web Services - Restful Booker API Tests (Playwright)

## Project Description

This project contains automated API tests for the Restful Booker web service using Playwright.

The API requests were initially explored, tested, and debugged using Postman. After validating the endpoints, the complete booking workflow was automated with the Playwright Test Runner.

The project follows the **Atomic Test Design** approach, where each logical step of the API workflow is organized into reusable methods, improving readability, maintainability, and scalability.

The purpose of this project is to verify the complete REST API booking lifecycle, including:

- Authentication
- Booking creation
- Retrieving booking details
- Updating booking information
- Deleting bookings

---

## Technologies

- JavaScript (ES Modules)
- Node.js
- Playwright Test
- Playwright APIRequestContext
- Atomic Test Design
- Postman (API request validation and debugging)

---

## API Under Test

**Restful Booker API**

https://restful-booker.herokuapp.com/

**API Documentation**

https://restful-booker.herokuapp.com/apidoc/index.html

---

## Test Scenario

The automated test covers the complete booking workflow.

### 1. Create Authentication Token

**Endpoint**

```
POST /auth
```

**Purpose**

Generate an authentication token required for authorized requests.

**Assertions**

- Response status code
- Response headers
- Authentication token exists

---

### 2. Create Booking

**Endpoint**

```
POST /booking
```

**Purpose**

Create a new booking and save the generated booking ID for further requests.

**Assertions**

- Response status code
- Response headers
- Booking ID exists
- Booking data is correct

---

### 3. Get Booking

**Endpoint**

```
GET /booking/{id}
```

**Purpose**

Retrieve the booking created in the previous step.

**Assertions**

- Response status code
- Response headers
- Booking data matches the created booking

---

### 4. Update Booking

**Endpoint**

```
PUT /booking/{id}
```

**Purpose**

Update the booking using the authentication token.

**Assertions**

- Response status code
- Response headers
- Updated booking data is returned correctly

---

### 5. Delete Booking

**Endpoint**

```
DELETE /booking/{id}
```

**Purpose**

Delete the booking and verify successful deletion.

**Assertions**

- Response status code
- Successful deletion response

---

## Test File

The main automated test is located at:

```
Project/e2e/booking-api.spec.js
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/peter-stefanski/WebServices-API-Testing.git
```

Navigate to the project directory:

```bash
cd Project
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Running Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run only the booking API test:

```bash
npx playwright test Project/e2e/bookingApi.spec.js
```

Run tests with the HTML report:

```bash
npx playwright test --reporter=html
```

Open the generated report:

```bash
npx playwright show-report
```

---

## Test Execution Flow

The automated test performs the following sequence:

```
1. Create Authentication Token

↓

2. Create Booking

↓

3. Get Booking

↓

4. Update Booking

↓

5. Delete Booking
```

---

## Assertions

Each step validates:

- HTTP status code
- Response headers
- Response body
- Authentication token
- Booking ID
- Returned booking data

The test ensures that every API response matches the expected behavior throughout the complete booking lifecycle.

---

## Development Process

1. Explored the Restful Booker API documentation.
2. Validated requests using Postman.
3. Designed reusable API methods following the Atomic Test Design approach.
4. Automated the complete booking workflow using Playwright.
5. Added assertions for every API response.
6. Executed the tests using the Playwright Test Runner.

---

## Notes

Postman was used only during the initial API exploration and request validation.

The final automated solution was implemented using Playwright's built-in API testing capabilities and follows the Atomic Test Design approach to keep the test code modular and reusable.
