const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Record extends Model { }

Record.init(
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
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },
        patient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'patient',
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'record',
    }
);

module.exports = Record;