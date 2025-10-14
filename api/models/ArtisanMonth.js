import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';


export class ArtisanMonth extends Model {}
ArtisanMonth.init({
artisan_id: { type: DataTypes.INTEGER, primaryKey: true },
month: { type: DataTypes.TINYINT, primaryKey: true },
year: { type: DataTypes.SMALLINT, primaryKey: true }
}, { sequelize, modelName: 'artisan_month', tableName: 'artisan_month' });