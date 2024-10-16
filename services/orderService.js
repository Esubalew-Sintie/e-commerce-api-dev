const { Order } = require("../models/DBInit");
const { prisma } = require("../models/DBInit");
const { BadRequest } = require("../utils/Errors");

module.exports.createOrder = async (userId, items) => {
  return prisma.$transaction(async (prisma) => {
    let total = 0; // Initialize total cost

    // Check stock and calculate total cost for each item before creating the order
    for (let i = 0; i < items.length; i++) {
      const product = await prisma.product.findUnique({
        where: {
          id: items[i].productId,
        },
      });

      // Ensure the product exists and has enough stock
      if (!product || product.stock < items[i].quantity) {
        throw new BadRequest(
          "Stock finished for product ID: " + items[i].productId
        );
      }

      // Calculate total price for the product and add to the total
      total += product.price * items[i].quantity;
    }

    // Update stock for each item
    for (let i = 0; i < items.length; i++) {
      await prisma.product.update({
        where: {
          id: items[i].productId,
        },
        data: {
          stock: {
            decrement: items[i].quantity,
          },
        },
      });
    }

    // Create the order along with order details
    const order = await prisma.order.create({
      data: {
        user_id: userId, // Match with your Order model (user_id is a String)
        total_price: total, // Set the calculated total price
        orderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });

    return order;
  });
};

module.exports.fetchOrdersByUserId = async (userId) => {
  return await Order.findMany({
    where: {
      userId: userId,
    },
  });
};

module.exports.fetchOrderById = async (orderId) => {
  return await Order.findUnique({
    where: {
      order_id: orderId,
    },
    include: {
      orderItems: true, // Include OrderItems details
    },
  });
};
