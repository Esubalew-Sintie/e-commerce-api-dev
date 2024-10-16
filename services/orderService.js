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
          id: items[i].id, // Use productId to fetch product
        },
      });

      // Ensure the product exists and has enough stock
      if (!product || product.stock < items[i].stock) {
        throw new BadRequest(
          "Stock finished for product ID: " + items[i].id
        );
      }

      // Calculate total price for the product and add to the total
      total += product.price * items[i].stock;
    }

    // Update stock for each item
    for (let i = 0; i < items.length; i++) {
      await prisma.product.update({
        where: {
          id: items[i].id, // Use productId to update stock
        },
        data: {
          stock: {
            decrement: items[i].stock, // Decrement by quantity
          },
        },
      });
    }

    // Create the order along with order details
    const order = await prisma.order.create({
      data: {
        user_id: userId, // User ID
        total_price: total, // Set the calculated total price
        status: "pending", // Default status for the order
        orderItems: {
          create: items.map((item) => ({
            productId: item.id, // Use productId for order item
            quantity: item.stock, // Use quantity for order item
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
      user_id: userId,
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
