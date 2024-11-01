const { User, Deck, Card, Attack } = require("../index");
const sequelize = require("../../db/config");

describe("Model Associations", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("User has one Deck", async () => {
    const user = await User.create({ username: "testUser" });

    // Create first deck
    const deck1 = await Deck.create({
      name: "testDeck1",
      xp: 0,
      userId: user.id,
    });

    // Create second deck without userId
    const deck2 = await Deck.create({
      name: "testDeck2",
      xp: 0,
    });

    // Explicitly set the new deck
    await user.setDeck(deck2);

    // Get the user's current deck
    const userDeck = await user.getDeck();

    // Verify it's the second deck
    expect(userDeck.name).toBe("testDeck2");
    expect(userDeck.id).toBe(deck2.id);
  });

  test("Deck has many Cards", async () => {
    const user = await User.create({ username: "testUser" });
    const deck = await Deck.create({
      name: "testDeck",
      xp: 0,
      userId: user.id,
    });

    const card1 = await Card.create({
      name: "Card1",
      mojo: 10,
      stamina: 10,
      imgUrl: "test.jpg",
      deckId: deck.id,
    });

    const card2 = await Card.create({
      name: "Card2",
      mojo: 20,
      stamina: 20,
      imgUrl: "test2.jpg",
      deckId: deck.id,
    });

    const deckCards = await deck.getCards();
    expect(deckCards).toHaveLength(2);
    expect(deckCards[0].name).toBe("Card1");
    expect(deckCards[1].name).toBe("Card2");
  });

  test("Cards and Attacks have many-to-many relationship", async () => {
    const user = await User.create({ username: "testUser" });
    const deck = await Deck.create({
      name: "testDeck",
      xp: 0,
      userId: user.id,
    });

    const card = await Card.create({
      name: "TestCard",
      mojo: 10,
      stamina: 10,
      imgUrl: "test.jpg",
      deckId: deck.id,
    });

    const attack1 = await Attack.create({
      title: "Attack1",
      mojoCost: 5,
      staminaCost: 5,
    });

    const attack2 = await Attack.create({
      title: "Attack2",
      mojoCost: 7,
      staminaCost: 7,
    });

    await card.addAttacks([attack1, attack2]);
    const cardAttacks = await card.getAttacks();

    expect(cardAttacks).toHaveLength(2);

    const card2 = await Card.create({
      name: "TestCard2",
      mojo: 15,
      stamina: 15,
      imgUrl: "test2.jpg",
      deckId: deck.id,
    });

    await card2.addAttack(attack1);
    const attack1Cards = await attack1.getCards();

    expect(attack1Cards).toHaveLength(2);
  });
});
