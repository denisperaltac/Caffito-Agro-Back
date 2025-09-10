import { DataTypes, Model } from "sequelize";

export class Dieta extends Model {}

export const initDietaModel = (sequelize) => {
  Dieta.init(
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
      receta: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Dieta",
      tableName: "dietas",
      timestamps: true,
    }
  );

  return Dieta;
};
