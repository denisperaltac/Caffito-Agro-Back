import { DataTypes, Model } from "sequelize";

export class Corral extends Model {}

export const initCorralModel = (sequelize) => {
  Corral.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombreCorral: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Corral",
      tableName: "corrales",
      timestamps: true,
    }
  );

  return Corral;
};
