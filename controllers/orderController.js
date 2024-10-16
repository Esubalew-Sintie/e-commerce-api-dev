const { log } = require("winston");
const {
  createOrder,
  fetchOrdersByUserId,
  fetchOrderById,
} = require("../services/orderService");
const { BadRequest, NotFound } = require("../utils/Errors");

module.exports.setOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const items = req.body.items;
    console.log(items);
    
    if (items?.length === 0) throw new BadRequest("product does not exists");

    const order = await createOrder(userId, items);
    res.status(201).json({
      success: true,
      message: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await fetchOrdersByUserId(userId);

    res.status(200).json({
      success: true,
      message: orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await fetchOrderById(orderId);

    res.status(200).json({
      success: true,
      message: order,
    });
  } catch (error) {
    next(error);
  }
};
