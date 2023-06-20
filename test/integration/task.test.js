/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const request = require("supertest");
const jwt = require("jsonwebtoken");
const Post = require("../../model/Post");
const app = require("../../app");
const { user, post1, post2, post3 } = require("../fixtures/db");
const User = require("../../model/User");

describe("post test case", () => {
  let token;
  beforeAll(async () => {
    token = jwt.sign(user, process.env.JWT_SECRET);
    await User.deleteMany();
    await Post.deleteMany();

    await new User(user).save();
    await new Post(post1).save();
    await new Post(post2).save();
    await new Post(post3).save();
  });
  test("should create task for user", async () => {
    const res = await request(app)
      .post("/post")
      .set("authorization", `Bearer ${token}`)
      .send({
        title: "post of jeel",
        description: "post description",
      })
      .expect(200);
    expect(res.body.data).not.toBeNull();
    expect(res.body.data.title).toBe("post of jeel");
  });
  test("should get all post of user", async () => {
    const res = await request(app)
      .get("/my-posts")
      .set("authorization", `Bearer ${token}`)
      .expect(200);
    const { code, message, data } = res.body;
    expect(code).toBe(200);
    expect(message).toBe("your post");
    expect(Array.isArray(data)).toBe(true);
  });

  test("should post by id", async () => {
    const res = await request(app)
      .get(`/myPost/${post1._id}`)
      .set("authorization", `Bearer ${token}`)
      .expect(200);
    const { code, message, data } = res.body;
    expect(code).toBe(200);
    expect(message).toBe("your post");
    expect(Array.isArray(data)).toBe(true);
  });

  test("update post", async () => {
    const res = await request(app)
      .put(`/post/${post1._id}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        title: "updated title of post1",
      })
      .expect(200);
    expect(res.body.data.title).toBe("updated title of post1");
  });

  test("delete post", async () => {
    const res = await request(app)
      .delete(`/post/${post2._id}`)
      .set("authorization", `Bearer ${token}`)
      .expect(200);
    expect(res.body.message).toBe("post deleted successfully");
  });
});
