import { Favorite } from './Favorite';
import { Product } from './Product';
import { User } from './User';
import { Purchase } from './Purchase';

Product.belongsToMany(User, { through: Favorite });
Product.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'product_id' });
Favorite.belongsTo(Product);
Favorite.belongsTo(User);
User.belongsToMany(Product, { through: Favorite });
User.hasMany(Favorite, { as: 'favoritesProducts', foreignKey: 'user_id' });

Product.belongsToMany(User, { through: Purchase });
Product.hasMany(Purchase, { as: 'purchasesUsers', foreignKey: 'product_id' });
Purchase.belongsTo(Product);
Purchase.belongsTo(User);
User.belongsToMany(Product, { through: Purchase });
User.hasMany(Purchase, { as: 'purchasesProducts', foreignKey: 'user_id' });

export { Product, User, Favorite, Purchase };
