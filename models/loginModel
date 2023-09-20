const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { default: isEmail } = require('validator/lib/isEmail');

class Login extends Model { }

Login.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'login',
    }
);

module.exports = Login;