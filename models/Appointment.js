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
        reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'doctor',
                key: 'id'
            }
        },
        patient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'patient',
                key: 'id'
            }
        },
        anamnesis: {
            type: DataTypes.TEXT('medium'),
            allowNull: false,
        },
        physical_exam: {
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        initial_diagnosis: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tests_needed: {
            type: DataTypes.TEXT("tiny"),
        },
        prescription: {
            type: DataTypes.TEXT("tiny"),
        },
        orientation: {
            type: DataTypes.TEXT('medium'),
        },
        next_appointment: {
            type: DataTypes.DATE,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'appointment'
    }
);

module.exports = Appointment;