import { DataTypes, Model } from "sequelize";

export class Animal extends Model {}

export const initAnimalModel = (sequelize) => {
  Animal.init(
    {
      rp: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      nacimiento: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      madre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      padre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      baja: {
        type: DataTypes.ENUM("muerto", "venta", "activo"),
        defaultValue: "activo",
      },
    },
    {
      sequelize,
      modelName: "Animal",
      tableName: "animales",
      timestamps: true,
    }
  );

  return Animal;
};
