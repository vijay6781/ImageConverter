const { sequelize } = require("../models");
const { fields } = require("../src/utils/upload");

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await sequelize.transaction();
    try {
      await queryInterface.createTable(
        "image_storages",
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          prooductName: {
            type: Sequelize.STRING,
            field: "product_name",
          },
          imageUrls: {
            type: Sequelize.JSONB,
            default: [],
            field: "iamge_urls",
          },
          createdBy: {
            type: Sequelize.JSONB,
          },
          modifiedBy: {
            type: Sequelize.JSONB,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          deletedAt: {
            type: Sequelize.DATE,
          },
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  },

  async down(Sequelize, queryInterface) {
    const transaction = await sequelize.transaction();
    try {
      await queryInterface.dropTable("image_storages", {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  },
};
