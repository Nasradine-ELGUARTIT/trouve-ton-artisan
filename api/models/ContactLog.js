import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';


export class ContactLog extends Model {}
ContactLog.init({
id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
artisan_id: { type: DataTypes.INTEGER, allowNull: false },
name: { type: DataTypes.STRING(160), allowNull: false },
email: { type: DataTypes.STRING(160), allowNull: false },
subject: { type: DataTypes.STRING(160), allowNull: false },
message: { type: DataTypes.TEXT, allowNull: false },
ip: { type: DataTypes.STRING(64) },
user_agent: { type: DataTypes.STRING(255) },
created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'contacts_log', tableName: 'contacts_log', timestamps: false });