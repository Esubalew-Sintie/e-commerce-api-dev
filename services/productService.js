const { cacheClient } = require('../cache/cacheDBInit');
const { Product } = require('../models/DBInit');
// const { getVerifyProductEX } = require('../utils/appConfigs');
// const { BadRequest } = require('../utils/appErrors');

module.exports.createProduct = async (product) => {
    return await Product.create({
        data: product
    })
};

module.exports.fetchProduct = async (productId) => {
    return await Product.findUnique({
        where: {
            id: productId
        }
    })
}

module.exports.fetchProductSearchResults = async (arg) => {
    return Product.findMany({
        where:{
            name: arg
        }
    });
};

module.exports.fetchProductsWithPagination = async (category, skip, take) => {
    let products;

    if (category) {
        products = await Product.findMany({
            skip: skip,
            take: take,
            where: {
                category: category
                
            }
        });
    } else {
        products = await Product.findMany({
            skip: skip,
            take: take
        });
    }

    return products
};

module.exports.fetchProductForCart = async (productId) => {
    return await Product.findUnique({
        where: {
            id: productId
        },
        select: {
            name: true,
            price: true,
            stock: true
        }
    });
};



// for order rouute // items
module.exports.updateProductStockForOrder =  async (item) => {
        const updatedProduct = await Product.update({
            where: {
                id: item.productId
            }, 
            data: {
                stock: {
                    decrement:item.quantity
                }
            }
        });

        return updatedProduct

        // const updatedProducts = [];

        // for (let i = 0; i < items.length; i++) {
        //     let updatedProduct =  Product.update({
        //         where: {
        //             id: items[i].productId
        //         }, 
        //         data: {
        //             stock: {
        //                 decrement:items[i].quantity
        //             }
        //         }
        //     });

        //     updatedProducts.push(updatedProduct);
        // }

        // // return await Promise.all(updatedProducts); 
        // const results =  await Promise.all(updatedProducts); 
        // let validity;

        // for( let i = 0; i < results.length; i++) {
        //     if (results[i].stock < 0) {
        //         validity = false
        //     } else {
        //         validity = true
        //     }
        // }

        // return validity;  
};
module.exports.updateProduct = async (productId, updatedData) => {
  return await Product.update({
    where: {
      id: productId,
    },
    data: updatedData,
  });
};

module.exports.updateProductStock = async (productId, stock) => {
    return await Product.update({
        where: {
            id: productId
        },
        data: {
            stock: {
                increment: stock
            }
        }
    });
};