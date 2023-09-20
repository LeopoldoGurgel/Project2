const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Doctor extends Model { }

Doctor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
       fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preferedName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
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
        email: {
            type: DataTypes.STRING,
            isUnique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        DOB: {
            type: DataTypes.DATE,
            isUnique: false,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        address: {
            type: DataTypes.STRING,
            isUnique: false,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            isUnique: false,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
       
      emergencyContactNumber: {
            type: DataTypes.INTEGER,
            isUnique: false,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        emergencyContactFullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loginId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isUnique: true,
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                if (updatedUserData.password) {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                }
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'doctor',
    }
);

module.exports = Doctor;