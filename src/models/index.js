import { sequelize } from "../config/database.js";
import { initUserModel } from "./user.model.js";
import { initAnimalModel } from "./animal.model.js";
import { initPesoModel } from "./peso.model.js";
import { initProductoModel } from "./producto.model.js";
import { initDietaModel } from "./dieta.model.js";
import { initSanidadModel } from "./sanidad.model.js";
import { initReproduccionModel } from "./reproduccion.model.js";
import { initHistorialDietaModel } from "./historialDieta.model.js";
import { initCorralModel } from "./corral.model.js";

const db = {};

db.sequelize = sequelize;
db.User = initUserModel(sequelize);
db.Animal = initAnimalModel(sequelize);
db.Peso = initPesoModel(sequelize);
db.Producto = initProductoModel(sequelize);
db.Dieta = initDietaModel(sequelize);
db.Sanidad = initSanidadModel(sequelize);
db.Reproduccion = initReproduccionModel(sequelize);
db.HistorialDieta = initHistorialDietaModel(sequelize);
db.Corral = initCorralModel(sequelize);

// Associations
// Animal has many Pesos
db.Animal.hasMany(db.Peso, {
  foreignKey: { name: "animalId", allowNull: false },
  onDelete: "CASCADE",
});
db.Peso.belongsTo(db.Animal, {
  foreignKey: { name: "animalId", allowNull: false },
});

// Animal has many Sanidad
db.Animal.hasMany(db.Sanidad, {
  foreignKey: { name: "animalId", allowNull: false },
  onDelete: "CASCADE",
});
db.Sanidad.belongsTo(db.Animal, {
  foreignKey: { name: "animalId", allowNull: false },
});

// Reproduccion belongs to Animal (subject) and optionally to animalCria
db.Animal.hasMany(db.Reproduccion, {
  foreignKey: { name: "animalId", allowNull: false },
  as: "reproducciones",
});
db.Reproduccion.belongsTo(db.Animal, {
  foreignKey: { name: "animalId", allowNull: false },
  as: "animal",
});

db.Animal.hasMany(db.Reproduccion, {
  foreignKey: { name: "animalCriaId", allowNull: true },
  as: "crias",
});
db.Reproduccion.belongsTo(db.Animal, {
  foreignKey: { name: "animalCriaId", allowNull: true },
  as: "animalCria",
});

// Animal belongs to Dieta (current) via dietaId
db.Dieta.hasMany(db.Animal, {
  foreignKey: { name: "dietaId", allowNull: true },
});
db.Animal.belongsTo(db.Dieta, {
  foreignKey: { name: "dietaId", allowNull: true },
});

// Corrales have many Animales; Animal belongsTo Corral (normalized instead of array of FKs)
db.Corral.hasMany(db.Animal, {
  foreignKey: { name: "corralId", allowNull: true },
});
db.Animal.belongsTo(db.Corral, {
  foreignKey: { name: "corralId", allowNull: true },
});

// Corrales have current Dieta
db.Dieta.hasMany(db.Corral, {
  foreignKey: { name: "dietaId", allowNull: true },
});
db.Corral.belongsTo(db.Dieta, {
  foreignKey: { name: "dietaId", allowNull: true },
});

// HistorialDietas references Corral and Dieta
db.Corral.hasMany(db.HistorialDieta, {
  foreignKey: { name: "corralId", allowNull: false },
  onDelete: "CASCADE",
});
db.HistorialDieta.belongsTo(db.Corral, {
  foreignKey: { name: "corralId", allowNull: false },
});

db.Dieta.hasMany(db.HistorialDieta, {
  foreignKey: { name: "dietaId", allowNull: false },
});
db.HistorialDieta.belongsTo(db.Dieta, {
  foreignKey: { name: "dietaId", allowNull: false },
});

export default db;
