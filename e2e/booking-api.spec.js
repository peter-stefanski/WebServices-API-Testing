import assert from "node:assert";
import { test } from "@playwright/test";

test("API Tests", async () => {
  const BASE_URL = "https://restful-booker.herokuapp.com";

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

    assert.strictEqual(response.status, 200);
    assert.ok(
      response.headers.get("content-type").includes("application/json"),
    );

    const data = await response.json();

    assert.ok(data.token);

    return data.token;
  }

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

    assert.strictEqual(response.status, 200);
    assert.ok(
      response.headers.get("content-type").includes("application/json"),
    );

    const data = await response.json();

    assert.ok(data.bookingid);
    assert.strictEqual(data.booking.firstname, "John");
    assert.strictEqual(data.booking.lastname, "Smith");

    return data.bookingid;
  }

  async function getBooking(bookingId) {
    const response = await fetch(`${BASE_URL}/booking/${bookingId}`);

    assert.strictEqual(response.status, 200);
    assert.ok(
      response.headers.get("content-type").includes("application/json"),
    );

    const data = await response.json();

    assert.strictEqual(data.firstname, "John");
    assert.strictEqual(data.lastname, "Smith");

    return data;
  }

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

    assert.strictEqual(response.status, 200);
    assert.ok(
      response.headers.get("content-type").includes("application/json"),
    );

    const data = await response.json();

    assert.strictEqual(data.firstname, "JohnUpdated");
    assert.strictEqual(data.lastname, "SmithUpdated");

    return data;
  }

  async function deleteBooking(bookingId, token) {
    const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        Cookie: `token=${token}`,
      },
    });

    assert.strictEqual(response.status, 201);

    const data = await response.text();

    assert.strictEqual(data, "Created");

    return true;
  }
  //.....................................................................

  // Atomic tests

  await test.step("Scenario 1 - Create Booking", async () => {
    const bookingId = await createBooking();

    assert.ok(bookingId);

    console.log("Create Booking passed");
  });

  await test.step("Scenario 2 - Get Booking", async () => {
    const bookingId = await createBooking();

    const booking = await getBooking(bookingId);

    assert.strictEqual(booking.firstname, "John");
    assert.strictEqual(booking.lastname, "Smith");

    console.log("Get Booking passed");
  });

  await test.step("Scenario 3 - Update Booking", async () => {
    const token = await createToken();

    const bookingId = await createBooking();

    const updatedBooking = await updateBooking(bookingId, token);

    assert.strictEqual(updatedBooking.firstname, "JohnUpdated");
    assert.strictEqual(updatedBooking.lastname, "SmithUpdated");

    console.log("Update Booking passed");
  });

  await test.step("Scenario 4 - Delete Booking", async () => {
    const token = await createToken();

    const bookingId = await createBooking();

    const deleted = await deleteBooking(bookingId, token);

    assert.strictEqual(deleted, true);

    console.log("Delete Booking passed");
  });
});
