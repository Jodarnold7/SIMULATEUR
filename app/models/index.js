const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.refreshToken = require("./refreshToken.model.js")(sequelize, Sequelize);
db.loan = require("./loan.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
});
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
});
db.user.hasMany(db.loan, { foreignKey: "userId" });
db.loan.belongsTo(db.user);
module.exports = db;
