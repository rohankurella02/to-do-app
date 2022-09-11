const Sequelize = require('sequelize');


const sequelize = new Sequelize('railway', 'root', 'UFxufNELv7xYhHV0PXRq', {
    host: 'containers-us-west-70.railway.app',
    dialect: 'mysql',
    port: 7655
});

const db = {}
db.sequelize = sequelize;
db.models = {}
db.models.Task = require('./models/task')(sequelize, Sequelize.DataTypes);
module.exports = db;

module.exports = sequelize;