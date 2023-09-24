const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Doctor extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Doctor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        isDoctor: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        fullName: {
            type: DataTypes.STRING,

        },
        preferedName: {
            type: DataTypes.STRING,

        },
        username: {
            type: DataTypes.STRING,
            isUnique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4],
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
            validate: {
                isDate: true
            }
        },
        address: {
            type: DataTypes.STRING,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            validate: {
                isNumeric: true
            }
        },       
        emergencyContactNumber: {
            type: DataTypes.STRING,
            validate: {
                isNumeric: true
            }
        },
        emergencyContactFullName: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
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