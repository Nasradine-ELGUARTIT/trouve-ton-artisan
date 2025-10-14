import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

export class Category extends Model {}
Category.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  slug: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, { sequelize, modelName: 'category', tableName: 'categories' });
