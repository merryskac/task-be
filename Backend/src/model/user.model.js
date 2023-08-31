import { DataTypes, Sequelize } from "sequelize";
import database from "../config/database.config.js";

const user = database.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: DataTypes.STRING,
    profile_img: DataTypes.STRING,
  },
  {
    freezeTableName: true, // menghilangkan s (user(s))
    timestamps: false,
  }
);

const syncUser = async () => {
  await user.sync();
};
syncUser();

export default user;
