const router = require('express').Router();
const { authorizeAccess,
        authorizeAdmin 
      } = require('../middlewares/handleCurrentUser');
const { validateProduct,
      } = require('../middlewares/validate');
const { setProduct,
        getProduct,
        getProducts,
        deleteProduct,
        UpdateProductStock
      } = require('../controllers/productController');

router.route('')
      .post(authorizeAccess, 
            authorizeAdmin, 
            validateProduct,
            setProduct)
      .get(getProducts)
router.get('/:productId', getProduct);
router.put(
  "/:productId",
  authorizeAccess,
  authorizeAdmin,
  validateProduct,
  UpdateProductStock
);
router.delete("/:productId", authorizeAccess, authorizeAdmin,deleteProduct);
module.exports = router;

