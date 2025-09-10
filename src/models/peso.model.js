import { DataTypes, Model } from "sequelize";

export class Peso extends Model {}

export const initPesoModel = (sequelize) => {
  Peso.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      kg: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      ganancia: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Peso",
      tableName: "pesos",
      timestamps: true,
    }
  );

  return Peso;
};
