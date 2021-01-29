const User = require("./user-model");
const db = require("../../data/dbConfig");

const Matt = { name: "Matt Bokovitz" };
const Pete = { name: "Pete Bokovitz" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("User model", () => {
  it("User.getAll returns empty array if no users", async () => {
    const result = await User.getAll();
    expect(result).toHaveLength(0);
  });
  it("User.getAll returns users", async () => {
    await db("users").insert(Matt);
    await db("users").insert(Pete);
    const result = await User.getAll();
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("name", "Matt Bokovitz");
    expect(result[1]).toHaveProperty("name", "Pete Bokovitz");
  });
});
