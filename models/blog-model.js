module.exports = (sequelize, DataTypes) => {
    return sequelize.define('blog', {
        title: {
            type: DataTypes.TEXT('small')
        },
        description: {
            type: DataTypes.TEXT('long')
        },
        article: {
            type: DataTypes.TEXT('long')
        }
    });
}
