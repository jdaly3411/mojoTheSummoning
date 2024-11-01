// create your User model here
const { DataTypes } = require("sequelize");
const sequelize = require("../db/");

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

module.exports = { User, Deck };
