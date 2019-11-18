module.exports = (sequelize, DataTypes) => {
    return sequelize.define('location', {
        address: {
            type: DataTypes.STRING
        }
    });
}