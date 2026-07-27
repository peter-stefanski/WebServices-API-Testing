import assert from "node:assert";
import { test } from "@playwright/test";
import BookingServicesAdmin from "../services/bookingServiseAdmin.js";

const bookingService = new BookingServicesAdmin();

let token;

test.beforeEach(async () => {
    token = await bookingService.CreateToken();
});

test("Booking API - scenarios", async () => {
    await test.step("Scenario 1 - Create Booking", async () => {
        const bookingId = await bookingService.CreateBooking();
        assert.ok(bookingId);
        console.log("Create Booking passed");
    });

    await test.step("Scenario 2 - Get Booking", async () => {
        const bookingId = await bookingService.CreateBooking();
        const booking = await bookingService.GetBooking(bookingId);
        assert.strictEqual(booking.firstname, "John");
        assert.strictEqual(booking.lastname, "Smith");
        console.log("Get Booking passed");
    });

    await test.step("Scenario 3 - Update Booking", async () => {
        const bookingId = await bookingService.CreateBooking();
        const updatedBooking = await bookingService.UpdateBooking(
            bookingId,
            token,
        );
        assert.strictEqual(updatedBooking.firstname, "JohnUpdated");
        assert.strictEqual(updatedBooking.lastname, "SmithUpdated");
        console.log("Update Booking passed");
    });

    await test.step("Scenario 4 - Delete Booking", async () => {
        const bookingId = await bookingService.CreateBooking();
        const deleted = await bookingService.DeleteBooking(bookingId, token);
        assert.strictEqual(deleted, true);
        console.log("Delete Booking passed");
    });
});
