import { DataTypes, Model } from "sequelize";

export class Sanidad extends Model {}

export const initSanidadModel = (sequelize) => {
  Sanidad.init(
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
      tipo: {
        type: DataTypes.ENUM("aftosa", "tuberculina", "brucelosis"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Sanidad",
      tableName: "sanidades",
      timestamps: true,
    }
  );

  return Sanidad;
};
