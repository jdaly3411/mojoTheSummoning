const { User, Deck } = require("../index");
const sequelize = require("../../db/config");

describe("User Model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should create a User", async () => {
    const user = await User.create({ username: "testUser" });
    expect(user.username).toBe("testUser");
  });

  test("should associate a User with a Deck", async () => {
    const user = await User.create({ username: "testUser2" });
    const deck = await Deck.create({ name: "testDeck", xp: 0 });
    await user.setDeck(deck);
    const userDeck = await user.getDeck();
    expect(userDeck.name).toBe("testDeck");
  });
});
