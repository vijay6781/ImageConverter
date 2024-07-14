const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const { productCommentTypes } = require("../src/constants");
const { ImageStorage } = require(".");

module.exports = (sequelize, DataTypes) => {
  class ImageStorage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  FFRenderComment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      productName: {
        type: DataTypes.STRING,
        field: "product_name",
      },
      imageUrls: {
        type: DataTypes.JSONB,
        defaultValue: [],
        field: "iamge_urls",
      },
      createdBy: {
        type: DataTypes.JSONB,
      },
      modifiedBy: {
        type: DataTypes.JSONB,
      },
    },
    {
      sequelize,
      modelName: "image_storages",
      paranoid: true,
      timestamps: true,
    }
  );
  return ImageStorage;
};
