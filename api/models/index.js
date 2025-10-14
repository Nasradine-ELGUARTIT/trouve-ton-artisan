import { Category } from './Category.js';
import { Specialty } from './Specialty.js';
import { Artisan } from './Artisan.js';
import { ArtisanMonth } from './ArtisanMonth.js';
import { ContactLog } from './ContactLog.js';

Category.hasMany(Specialty, { foreignKey: 'category_id' });
Specialty.belongsTo(Category, { foreignKey: 'category_id' });

Specialty.hasMany(Artisan, { foreignKey: 'specialty_id' });
Artisan.belongsTo(Specialty, { foreignKey: 'specialty_id' });

Artisan.hasMany(ContactLog, { foreignKey: 'artisan_id' });
ContactLog.belongsTo(Artisan, { foreignKey: 'artisan_id' });

Artisan.hasMany(ArtisanMonth, { foreignKey: 'artisan_id' });
ArtisanMonth.belongsTo(Artisan, { foreignKey: 'artisan_id' });

export { Category, Specialty, Artisan, ArtisanMonth, ContactLog };
