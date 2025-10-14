import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';


export class Artisan extends Model {}
Artisan.init({
id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
specialty_id: { type: DataTypes.INTEGER, allowNull: false },
name: { type: DataTypes.STRING(160), allowNull: false },
rating: { type: DataTypes.DECIMAL(2,1), defaultValue: 0 },
city: { type: DataTypes.STRING(120) },
department_code: { type: DataTypes.STRING(3) },
postal_code: { type: DataTypes.STRING(10) },
website_url: { type: DataTypes.STRING(255) },
image_url: { type: DataTypes.STRING(255) },
about: { type: DataTypes.TEXT },
email_contact: { type: DataTypes.STRING(160), allowNull: false }
}, { sequelize, modelName: 'artisan', tableName: 'artisans' });