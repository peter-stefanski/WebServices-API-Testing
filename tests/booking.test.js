import assert from "node:assert";

const BASE_URL = "https://restful-booker.herokuapp.com";

// Scenario 1: POST /auth

async function createToken() {
  const response = await fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "admin",
      password: "password123",
    }),
  });

  // status
  assert.strictEqual(response.status, 200);

  // headers
  assert.ok(response.headers.get("content-type").includes("application/json"));

  // body
  const data = await response.json();

  assert.ok(data.token);

  return data.token;
}

// Scenario 2:  POST - booking

async function createBooking() {
  const response = await fetch(`${BASE_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: "John",
      lastname: "Smith",
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-07-10",
        checkout: "2026-07-15",
      },
      additionalneeds: "Breakfast",
    }),
  });

  // status
  assert.strictEqual(response.status, 200);

  // headers
  assert.ok(response.headers.get("content-type").includes("application/json"));

  // body
  const data = await response.json();

  assert.ok(data.bookingid);
  assert.strictEqual(data.booking.firstname, "John");
  assert.strictEqual(data.booking.lastname, "Smith");

  return data.bookingid;
}

// Scenario 3: GET /booking/{id}

async function getBooking(bookingId) {
  const response = await fetch(`${BASE_URL}/booking/${bookingId}`);

  // status
  assert.strictEqual(response.status, 200);

  // headers
  assert.ok(response.headers.get("content-type").includes("application/json"));

  // body
  const data = await response.json();

  assert.strictEqual(data.firstname, "John");
  assert.strictEqual(data.lastname, "Smith");

  return data;
}

// Scenario 4: PUT /booking/{id}

async function updateBooking(bookingId, token) {
  const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
    body: JSON.stringify({
      firstname: "JohnUpdated",
      lastname: "SmithUpdated",
      totalprice: 200,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-07-11",
        checkout: "2026-07-16",
      },
      additionalneeds: "Lunch",
    }),
  });

  // status
  assert.strictEqual(response.status, 200);

  // headers
  assert.ok(response.headers.get("content-type").includes("application/json"));

  // body
  const data = await response.json();

  assert.strictEqual(data.firstname, "JohnUpdated");
  assert.strictEqual(data.lastname, "SmithUpdated");

  return data;
}

// Scenario 5: DELETE /booking/{id}

async function deleteBooking(bookingId, token) {
  const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
    method: "DELETE",
    headers: {
      Cookie: `token=${token}`,
    },
  });

  // status
  assert.strictEqual(response.status, 201);

  // body
  const data = await response.text();

  assert.strictEqual(data, "Created");

  return true;
}

// API test execution

const token = await createToken();

const bookingId = await createBooking();

const booking = await getBooking(bookingId);

const updatedBooking = await updateBooking(bookingId, token);

const deleted = await deleteBooking(bookingId, token);

console.log("Token:", token);
console.log("Booking ID:", bookingId);
console.log("Booking:", booking);
console.log("Updated booking:", updatedBooking);
console.log("Deleted:", deleted);

console.log("All API tests passed!");
