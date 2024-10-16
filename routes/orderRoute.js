const router = require('express').Router();
const { setOrder,
        getOrder,
        getOrders,
      } = require('../controllers/orderController');
const { authorizeAccess } = require('../middlewares/handleCurrentUser');

router.route('/')
      .get(authorizeAccess, getOrders)
      .post(authorizeAccess, setOrder);

router.route('/:orderId')
      .get(authorizeAccess, getOrder)
      
module.exports = router;
