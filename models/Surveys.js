'use strict';

module.exports = function(sql, DataTypes) {
    return sql.define('Surveys', {
        eventName: DataTypes.STRING,
        questionOne: {
            type: DataTypes.STRING,
            required: true
        },
        questionTwo: DataTypes.TEXT,
        questionThree: {
            type: DataTypes.STRING,
            required: true
        },
        questionFour: DataTypes.TEXT,
        questionFive: DataTypes.TEXT,
        ipAddress: DataTypes.STRING
    })
}