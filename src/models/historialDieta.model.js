import { DataTypes, Model } from "sequelize";

export class HistorialDieta extends Model {}

export const initHistorialDietaModel = (sequelize) => {
  HistorialDieta.init(
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
    },
    {
      sequelize,
      modelName: "HistorialDieta",
      tableName: "historial_dietas",
      timestamps: true,
    }
  );

  return HistorialDieta;
};
