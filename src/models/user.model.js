import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

export class User extends Model {}

export const initUserModel = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["passwordHash", "refreshToken"] },
      },
      scopes: {
        withPassword: { attributes: {} },
      },
    }
  );

  User.beforeCreate(async (user) => {
    if (user.passwordHash && !user.passwordHash.startsWith("$2b$")) {
      const saltRounds = 10;
      user.passwordHash = await bcrypt.hash(user.passwordHash, saltRounds);
    }
  });

  return User;
};
