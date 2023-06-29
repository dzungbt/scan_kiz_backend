module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Products', 'categoryId', {
                    type: Sequelize.DataTypes.INTEGER,
                }, { transaction: t }),


            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Products', 'des', { transaction: t }),
            ]);
        });
    }
};