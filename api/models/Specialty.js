// api/models/Speciality.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

export class Specialty extends Model {}
Specialty.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(120), allowNull: false },
    slug: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  },
  { sequelize, modelName: 'specialty', tableName: 'specialties' }
);
