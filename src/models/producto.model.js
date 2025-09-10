import { DataTypes, Model } from "sequelize";

export class Producto extends Model {}

export const initProductoModel = (sequelize) => {
  Producto.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      proveedor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Producto",
      tableName: "productos",
      timestamps: true,
    }
  );

  return Producto;
};
