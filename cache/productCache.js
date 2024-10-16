const {cacheClient} = require("./cacheDBInit"); // Redis client

const getVerifyProductEX = () => 60; // Cache for 60 seconds

module.exports.setProductCache = async (products) => {
  const verifyProductEX = getVerifyProductEX();
  await cacheClient.set("products", JSON.stringify(products), {
    EX: verifyProductEX,
  });
};

module.exports.getProductsCache = async () => {
  const cachedProducts = await cacheClient.get("products");
  return cachedProducts ? JSON.parse(cachedProducts) : null;
};

module.exports.deleteProductsCache = async () => {
  await cacheClient.del("products");
};
