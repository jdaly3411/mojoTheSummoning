const User = require("./User");
const Deck = require("./Deck");
const Card = require("./Card");
const Attack = require("./Attack");

// Associations
User.hasOne(Deck, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Deck.belongsTo(User, {
  foreignKey: "userId",
});

Deck.hasMany(Card, {
  foreignKey: "deckId",
  onDelete: "CASCADE",
});

Card.belongsTo(Deck, {
  foreignKey: "deckId",
});

Card.belongsToMany(Attack, {
  through: "CardAttacks",
  onDelete: "CASCADE",
});

Attack.belongsToMany(Card, {
  through: "CardAttacks",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Deck,
  Card,
  Attack,
};
