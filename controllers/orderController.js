const con = require("../database");
const orderSchema = require("../validator/orderSchema");
const orderController = {
  async createOrder(req, res, next) {
    try {
      const { error } = orderSchema.validate(req.body);
      if (error) return next(error);

      const orderbody = {
        productId: req.body.productId,
        productPrice: req.body.productPrice,
        orderQty: req.body.orderQty,
        paymentMethod: req.body.paymentMethod,
        productPrice: req.body.productPrice,
        tax: req.body.tax,

        // after tax included
        totalAmount: req.body.totalAmount,
      };
      con.query(`insert into tbl_order set ?`, orderbody, (err, response) => {
        if (err) return next(err);
        res.json({
          code: 1,
          message: "Order has been created successfully",
          data: [],
        });
      });
    } catch (e) {
      return next(e);
    }
  },
};

module.exports = orderController;
