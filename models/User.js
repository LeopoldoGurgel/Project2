const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model{};

User.init(
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    isDoctor: {
        type: DataTypes.BOOLEAN
    }
}
)