import { DataTypes, Sequelize } from "sequelize";
import database from "../config/database.config.js";
import user from "./user.model.js";

export const Task = database.define(
  'tasks',
  {
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: user,
        key: 'id'
      }
    },
    judul:{
      type: DataTypes.STRING,
      allowNull: false
    },
    deskripsi:{
      type: DataTypes.TEXT('long')
    },
    deadline:{
      type: DataTypes.STRING,
      allowNull: false
    }, //2023-08-31T
    is_done:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    freezeTableName: true,
  }

)
const syncTask = async () =>{
  await Task.sync()   
}

syncTask()

