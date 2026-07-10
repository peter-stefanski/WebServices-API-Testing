import assert from "node:assert";

const BASE_URL = "https://restful-booker.herokuapp.com";

export default class BookingServicesAdmin {
  async CreateToken() {
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

  async CreateBooking() {
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

    return data.bookingid;
  }

  async GetBooking(bookingId) {
    const response = await fetch(`${BASE_URL}/booking/${bookingId}`);

    assert.strictEqual(response.status, 200);
    assert.ok(
      response.headers.get("content-type").includes("application/json"),
    );

    const data = await response.json();

    return data;
  }

  async UpdateBooking(bookingId, token) {
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

    const data = await response.json();

    return data;
  }

  async DeleteBooking(bookingId, token) {
    const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        Cookie: `token=${token}`,
      },
    });

    assert.strictEqual(response.status, 201);

    return true;
  }
}
