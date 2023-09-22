const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Patient extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Patient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        isDoctor: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
        age: {
            type: DataTypes.INTEGER,            
            validate: {
                isNumeric: true
            }
        },
        gender: {
            type: DataTypes.STRING,            
        },
        biologicalSex: {
            type:DataTypes.STRING,
        },
        maritalStatus: {
            type: DataTypes.STRING,            
        },
        ethnicity: {
            type: DataTypes.STRING,            
        },
        occupation: {
            type: DataTypes.STRING
        },
        allergies: {
            type: DataTypes.STRING,            

        },
        emergencyContactNumber: {
            type: DataTypes.STRING,           

            validate: {
                isNumeric: true
            }
        },
        emergencyContactfullName: {
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
        modelName: 'patient',
    }
);

module.exports = Patient;
