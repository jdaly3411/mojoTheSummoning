// create your User model here
const { DataTypes } = require("sequelize");
const sequelize = require("../db/config");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
});
const Deck = sequelize.define("Deck", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  xp: DataTypes.INTEGER,
});
const Card = sequelize.define("Card", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  mojo: DataTypes.INTEGER,
  stamina: DataTypes.INTEGER,
  imgUrl: DataTypes.STRING,
});
const Attack = sequelize.define("Attack", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  mojoCost: DataTypes.INTEGER,
  staminaCost: DataTypes.INTEGER,
});

User.hasOne(Deck);
Deck.belongsTo(User);

Deck.hasMany(Card);
Card.belongsTo(Deck);

Card.belongsToMany(Attack, { through: "CardAttacks" });
Attack.belongsToMany(Card, { through: "CardAttacks" });

module.exports = { User, Deck, Card, Attack };
