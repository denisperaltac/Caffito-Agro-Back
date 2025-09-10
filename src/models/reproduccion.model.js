import { DataTypes, Model } from "sequelize";

export class Reproduccion extends Model {}

export const initReproduccionModel = (sequelize) => {
  Reproduccion.init(
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
        type: DataTypes.ENUM("celo", "inseminacion", "nacimiento"),
        allowNull: false,
      },
      tipoInseminacion: {
        type: DataTypes.ENUM("toro", "inseminacion_artificial"),
        allowNull: true,
      },
      nombreInseminacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Reproduccion",
      tableName: "reproducciones",
      timestamps: true,
    }
  );

  return Reproduccion;
};
