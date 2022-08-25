import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app";
import * as helper from "./testHelper";

const api = supertest(app);

beforeEach(async () => {
  try {
    await helper.testSeed();
  } catch (error) {
    console.log(`Database Seed Failed: ${error}`);
  }
});

afterEach(async () => {
  try {
    await helper.clearDb();
  } catch (error) {
    console.log(`Database Clear Failed: ${error}`);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Home", () => {
  describe("When there are some Homes in the database", () => {
    test("Homes are returned as JSON", async () => {
      await api
        .get("/api/v1/homes")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
    test("All Homes are returned", async () => {
      const response = await api.get("/api/v1/homes");
      expect(response.body).toHaveLength(helper.initialHomes.length);
    });
    test(" A specific Home is within the returned response", async () => {
      const homeToCheck = helper.initialHomes[0];
      const response = await api
        .get("/api/v1/homes")
        .expect(200)
        .expect("Content-Type", /application\/json/);
      const homePrices = response.body.map((h) => h.price);
      expect(homePrices).toContain(homeToCheck.price);
    });
  });
  describe("Viewing a specific Home", () => {
    test("Succeeds with a valid id", async () => {
      const homesAtStart = await helper.homesInDb();
      const homeToView = homesAtStart[0];

      const response = await api
        .get(`/api/v1/homes/${homeToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const processedHome = JSON.parse(JSON.stringify(homeToView));
      expect(response.body).toEqual(homeToView);
    });
    test("Fails with invalid Id", async () => {
      const invalidId = await helper.nonExistingId();
      await api.get(`/api/v1/${invalidId}`).expect(404);
    });
  });
});
