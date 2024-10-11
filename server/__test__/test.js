const { beforeAll, afterAll, expect, describe, test } = require("@jest/globals");
const { User, Product, Claim, sequelize } = require("../models");
const request = require("supertest");
const app = require("../app");
const { hashPass } = require("../helpers/hash");

let access_token;

beforeAll(async () => {
  try {
    await User.destroy({ truncate: true, restartIdentity: true, cascade: true });
    await Product.destroy({ truncate: true, restartIdentity: true, cascade: true });
    await Claim.destroy({ truncate: true, restartIdentity: true, cascade: true });

    const userData = require("../data/user.json").map((e) => {
      e.password = hashPass(e.password);
      e.createdAt = e.updatedAt = new Date();
      return e;
    });

    await User.bulkCreate(userData);

    const productData = [
      { name: "Product 1", description: "Description 1", image: "image1.jpg", stock: 10 },
      { name: "Product 2", description: "Description 2", image: "image2.jpg", stock: 20 },
    ];
    await Product.bulkCreate(productData);
  } catch (error) {
    console.log(error, "beforeAll");
  }
});

describe("User Controller", () => {
  test("POST /register - success", async () => {
    const res = await request(app).post("/register").send({
      email: "newuser@mail.com",
      password: "password123",
    });
    expect(res.status).toBe(201);
    expect(res.body).toBe("newuser@mail.com  success added");
  });

  test("POST /login - success", async () => {
    const res = await request(app).post("/login").send({
      email: "admin@mail.com",
      password: "admin",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token", expect.any(String));
    access_token = res.body.access_token;
  });

  test("POST /auth/google - success", async () => {
    const res = await request(app).post("/auth/google").send({
      googleToken: "mock_google_token",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token", expect.any(String));
  });
});

describe("Product Controller", () => {
  test("GET /products - success", async () => {
    const res = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${access_token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeInstanceOf(Array);
  });

  test("GET /products/:id - success", async () => {
    const res = await request(app)
      .get("/products/1")
      .set("Authorization", `Bearer ${access_token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(typeof());
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBe(1);
  });

  test("POST /products - success", async () => {
    const newProduct = {
      name: "New Product",
      description: "A new product description",
      image: "http://example.com/image.jpg",
      stock: 10,
    };
    const res = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${access_token}`)
      .send(newProduct);
    expect(res.status).toBe(201);
    expect(res.body).toBe(`success added ${newProduct.name}`);
  });

  test("PUT /products/:id - success", async () => {
    const updatedProduct = {
      name: "Updated Product",
      description: "An updated product description",
      image: "http://example.com/updated-image.jpg",
      stock: 15,
    };
    const res = await request(app)
      .put("/products/1")
      .set("Authorization", `Bearer ${access_token}`)
      .send(updatedProduct);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", `succesfully update ${updatedProduct.name}`);
  });

  test("DELETE /products/:id - success", async () => {
    const res = await request(app)
      .delete("/products/2")
      .set("Authorization", `Bearer ${access_token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", expect.stringContaining("succesfully deleting"));
  });
});

describe("Claim Controller", () => {
  test("GET /claims - success", async () => {
    const res = await request(app)
      .get("/claims")
      .set("Authorization", `Bearer ${access_token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeInstanceOf(Array);
  });

  test("POST /claims/:id - success", async () => {
    const res = await request(app)
      .post("/claims/1")
      .set("Authorization", `Bearer ${access_token}`);
    expect(res.status).toBe(201);
    expect(res.body).toBe("Success claim");
  });
});

afterAll(async () => {
  await sequelize.close();
});
