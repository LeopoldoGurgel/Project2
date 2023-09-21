const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Appointment extends Model { }

Appointment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        record_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'record',
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },
        appointmentDate: {
            type: DataTypes.DATE,
            allowNull: false,

            validate: {
                isDate: true
            }
        },
        appointmentTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        drPreferedName: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "doctor",
                key: "preferedName"
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },
        preferedName: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "patient",
                key: "preferedName"
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            isUnique: false,
            allowNull: false,
            validate: {
                isNumeric: true
            },
            references: {
                model: "patient",
                key: "phoneNumber"
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },
        anamnesis: {
            type: DataTypes.STRING,
            allowNull: false
        },
        physical_exam: {
            type: DataTypes.STRING,
            allowNull: false
        },
        initial_diagnosis: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tests_needed: {
            type: DataTypes.STRING,
        },
        prescription: {
            type: DataTypes.STRING,
        },
        orientation: {
            type: DataTypes.STRING,
        },
        next_appointment: {
            type: DataTypes.DATE,
        },
        isactive: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'doctor',
    }
);

module.exports = Appointment;