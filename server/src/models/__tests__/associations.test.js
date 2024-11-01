const { User, Deck, Card, Attack } = require("../User");
const sequelize = require("../../db/config");

describe("Model Associations", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  test("User has one Deck", async () => {
    const user = await User.create({ username: "testUser" });
    const deck1 = await Deck.create({
      name: "testDeck1",
      xp: 0,
      userId: user.id,
    });

    const userDeck = await user.getDeck();
    expect(userDeck.id).toBe(deck1.id);
    expect(userDeck.name).toBe("testDeck1");

    const deck2 = await Deck.create({
      name: "testDeck2",
      xp: 0,
      userId: user.id,
    });

    const updatedUserDeck = await user.getDeck();
    expect(updatedUserDeck.id).toBe(deck2.id);
    expect(updatedUserDeck.name).toBe("testDeck2");

    await deck1.reload();
    expect(deck1.userId).toBe(user.id);
  });

  test("Deck has many Cards", async () => {
    const deck = await Deck.create({ name: "testDeck", xp: 0 });
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
    const deckCards = await deck.getCards();

    expect(deckCards).toHaveLength(2);
    expect(deckCards[0].name).toBe("Card1");
    expect(deckCards[1].name).toBe("Card2");
  });

  test("Cards and Attacks have many-to-many relationship", async () => {
    const card = await Card.create({
      name: "TestCard",
      mojo: 10,
      stamina: 10,
      imgUrl: "test.jpg",
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

    // Verify attacks can belong to multiple cards
    const card2 = await Card.create({
      name: "TestCard2",
      mojo: 15,
      stamina: 15,
      imgUrl: "test2.jpg",
    });

    await card2.addAttack(attack1);
    const attack1Cards = await attack1.getCards();

    expect(attack1Cards).toHaveLength(2);
  });
});
