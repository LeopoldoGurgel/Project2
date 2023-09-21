const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Patient extends Model { }

Patient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'doctor',
              key: 'id',
            }
        },
        fullName: {
            type: DataTypes.STRING,

        },
        preferedName: {
            type: DataTypes.STRING,
 
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: true
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

            validate: {
                isDate: true
            }
        },
        address: {
            type: DataTypes.STRING,
            isUnique: false,

        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            isUnique: false,

            validate: {
                isNumeric: true
            }
        },
        age: {
            type: DataTypes.INTEGER,
            isUnique: false,

            validate: {
                isNumeric: true
            }
        },
        gender: {
            type: DataTypes.STRING,
            isUnique: false,

        },
        biologicalSex: {
            type:DataTypes.STRING,

        },
        maritalStatus: {
            type: DataTypes.STRING,
            isUnique: false,

        },
        ethnicity: {
            type: DataTypes.STRING,
            isUnique: false,

        },
        occupation: {
            type: DataTypes.STRING,
            isUnique: false,

        },
        allergies: {
            type: DataTypes.STRING,
            isUnique: false,

        },
        emergencyContactNumber: {
            type: DataTypes.INTEGER,
            isUnique: false,

            validate: {
                isNumeric: true
            }
        },
        emergencyContactfullName: {
            type: DataTypes.STRING,

        },
        isactive: {
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
        modelName: 'patient',
    }
);

module.exports = Patient;
