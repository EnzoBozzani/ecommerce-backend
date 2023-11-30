import { Favorite } from './Favorite';
import { Product } from './Product';
import { User } from './User';

Product.belongsToMany(User, { through: Favorite });
Product.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'product_id' });
Favorite.belongsTo(Product);
Favorite.belongsTo(User);
User.belongsToMany(Product, { through: Favorite });
User.hasMany(Favorite, { as: 'favoritesProducts', foreignKey: 'user_id' });

export { Product, User, Favorite };
