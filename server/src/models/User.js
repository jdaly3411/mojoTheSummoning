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
    type: DataTypes.INTEGER, // Define the type of the id
    primaryKey: true, // Define the primary key
    autoIncrement: true, // Define the primary key and auto-increment
  },
  title: DataTypes.STRING, // Define the title of the attack
  mojoCost: DataTypes.INTEGER, // Define the mojo cost for the attack
  staminaCost: DataTypes.INTEGER, // Define the stamina cost for the attack
});

User.hasOne(Deck, {
  foreignKey: {
    name: "userId", // Define the foreign key
    allowNull: false, // Ensure that the User must have a Deck
  },
  onDelete: "CASCADE", // Ensure that if a User is deleted, the associated Deck is also deleted
});
Deck.belongsTo(User, {
  foreignKey: {
    name: "userId", // Define the foreign key
    allowNull: false, // Ensure that the Deck must belong to a User
  },
});

Deck.hasMany(Card, {
  foreignKey: {
    name: "deckId", // Define the foreign key
    allowNull: false, // Ensure that the Deck must have Cards
  },
  onDelete: "CASCADE",
});
Card.belongsTo(Deck, {
  foreignKey: {
    name: "deckId", // Define the foreign key
    allowNull: false, // Ensure that the Card must belong to a Deck
  },
});

Card.belongsToMany(Attack, {
  through: "CardAttacks",
  onDelete: "CASCADE",
});
Attack.belongsToMany(Card, {
  through: "CardAttacks", // Define the through association
  onDelete: "CASCADE", // Ensure that if a Card is deleted, the associated CardAttacks are also deleted
});

module.exports = { User, Deck, Card, Attack };
// export the models
