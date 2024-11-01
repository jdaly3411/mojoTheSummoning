const { Card, Attack } = require("../index");
const sequelize = require("../../db/config");

describe("Card Model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should create a Card", async () => {
    const card = await Card.create({
      name: "TestCard",
      mojo: 10,
      stamina: 10,
      imgUrl: "test.jpg",
    });
    expect(card.name).toBe("TestCard");
  });

  test("should associate a Card with multiple Attacks", async () => {
    const card = await Card.create({
      name: "TestCard2",
      mojo: 15,
      stamina: 15,
      imgUrl: "test2.jpg",
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
    const attacks = await card.getAttacks();
    expect(attacks).toHaveLength(2);
  });
});
