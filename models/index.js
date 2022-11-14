// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Products.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    mode: ProductTag,
    unique: false
  },
  as: 'product_to_tags'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    mode: ProductTag,
    unique: false
  },
  as: 'tags_to_products'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
