const {
  createProduct,
  fetchProduct,
  fetchProductSearchResults,
  updateProduct,
} = require("../services/productService");
const { NotFound } = require("../utils/Errors");
const { Product } = require("../models/DBInit");

const {
  getProductsCache,
  setProductCache,
  deleteProductsCache,
} = require("../cache/productCache");
const logger = require("../utils/logger");
const client = require("prom-client");

// Monitoring for Prometheus
const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 0.2, 0.5, 1, 1.5, 2, 5],
});
module.exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await fetchProduct(productId);
    if (!product) throw new NotFound("Product not found");
    logger.info(`Product created: ${product.name}`, { productId: product.id });

    res.status(200).json({
      success: true,
      message: { product: product },
    });
  } catch (error) {
    next(error);
  }
};

// Get products with caching
module.exports.getProducts = async (req, res, next) => {
  const { name } = req.query;
  const end = httpRequestDurationMicroseconds.startTimer();
  try {
    // Check cache
    let products = await getProductsCache();

    if (products) {
      logger.info("Fetched products from cache");
      return res.status(200).json({
        success: true,
        message: { products },
      });
    }

    // Fetch from DB if cache is empty
    products = await fetchProductSearchResults(name);

    // Cache the result
    await setProductCache(products);

    logger.info("Fetched products from database and set cache");

    res.status(200).json({
      success: true,
      message: { products },
    });
  } catch (error) {
    logger.error("Error fetching products", { error });
    next(error);
  } finally {
    end({ method: req.method, route: "/products", code: res.statusCode });
  }
};

module.exports.setProduct = async (req, res, next) => {
  try {
    const { image,cloudId } = req;
    const { name, price, stock, desc, category } = req.body;
    const product = await createProduct({
      name: name,
      price: price,
      stock: stock,
      desc: desc,
      image: image,
      category: category,
      cloudId: cloudId,
    });
    // Invalidate the cache
    await deleteProductsCache();

    logger.info(`Product updated: ${product.id}`);
    res.status(201).json({
      success: true,
      message: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Delete a product (Admin only)
module.exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    // Attempt to delete the product
    const deletedProduct = await Product.delete({
      where: { id: productId },
    });

    // If the product doesn't exist, handle the error
    if (!deletedProduct) {
      next(new NotFound("Product not found"));
    }
    // Invalidate the cache after adding a new product
    await deleteProductsCache();

    logger.info(`Product deleted and clear the cache `, {
      productId: deletedProduct.id,
      name: deletedProduct.name,
    });

    res.status(201).json({
      success: true,
      message: deletedProduct,
    });
  } catch (error) {
    logger.error("Error creating product", { error });
    next(error);
  }
};

module.exports.UpdateProductStock = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updatedData = req.body;
    const updatedProduct = await updateProduct(productId, updatedData);

    res.status(200).json({
      success: true,
      message: updatedProduct,
    });
  } catch (error) {
    if (error.code === "P2025") {
      next(new NotFound("Product not found"));
    } else {
      next(error);
    }
  }
};
