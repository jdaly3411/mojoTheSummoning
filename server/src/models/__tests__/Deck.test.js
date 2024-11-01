const { Deck, Card } = require("../index");
const sequelize = require("../../db/config");

describe("Deck Model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should create a Deck", async () => {
    const deck = await Deck.create({ name: "testDeck", xp: 0 });
    expect(deck.name).toBe("testDeck");
  });

  test("should associate a Deck with multiple Cards", async () => {
    const deck = await Deck.create({ name: "testDeck2", xp: 0 });
    const card1 = await Card.create({
      name: "Card1",
      mojo: 10,
      stamina: 10,
      imgUrl: "test.jpg",
    });
    const card2 = await Card.create({
      name: "Card2",
      mojo: 20,
      stamina: 20,
      imgUrl: "test2.jpg",
    });
    await deck.addCards([card1, card2]);
    const cards = await deck.getCards();
    expect(cards).toHaveLength(2);
  });
});
