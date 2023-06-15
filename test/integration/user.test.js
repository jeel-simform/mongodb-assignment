/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require("supertest");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const app = require("../../app");
const { user } = require("../fixtures/db");

describe("user test case", () => {
  beforeAll(async () => {
    await User.deleteMany();
    await new User(user).save();
  });
  test("should signup a new user", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        username: "test1",
        email: "test1@example.com",
        password: "1234",
      })
      .expect(200);
    expect(res.body.data).not.toBeNull();
    expect(res.body.data).toMatchObject({
      user: {
        username: "test1",
        email: "test1@example.com",
      },
    });
  });

  test("should log in existing user", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(200);
    expect(res.body.data).not.toBeNull();
    expect(res.body.data).toMatchObject({
      user: {
        username: "jeel",
        email: "jeel@gmail.com",
      },
    });
    expect(res.body.data).toHaveProperty("token");
  });
  test("should not login non existent user", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: user.email,
        password: "invalid password",
      })
      .expect(404);
    expect(res.body).toMatchObject({
      message: "user not found",
    });
  });
  test("should update user", async () => {
    const token = jwt.sign(user, process.env.JWT_SECRET);
    const res = await request(app)
      .put("/update-me")
      .set("authorization", `Bearer ${token}`)
      .send({
        username: "yash",
      })
      .expect(200);
    expect(res.body.data.username).toBe("yash");
    expect(res.body.data.email).toBe(user.email);
  });
  test("should not update invalid user field", async () => {
    const token = jwt.sign(user, process.env.JWT_SECRET);
    await request(app)
      .put("update-me")
      .set("authorization", `Bearer ${token}`)
      .send({
        location: "ahmedabad",
      })
      .expect(405);
  });
  test("should give error if user is not authorized and try to update profile", async () => {
    const res = await request(app)
      .put("/update-me")
      .send({
        username: "jeel",
      })
      .expect(403);
    expect(res.body.message).toBe("please provide authorization");
  });
});
