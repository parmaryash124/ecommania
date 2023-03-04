const con = require("../database");
const couponSchema = require("../validator/couponSchema");

const couponController = {
  async addCoupon(req, res, next) {
    const { error } = couponSchema.validate(req.body);
    if (error) return next(error);

    const couponBody = {
      couponTitle: req.body.couponTitle,
      couponCode: req.body.couponCode,
      qty: req.body.qty,
      value: req.body.value,
      minimumSpend: req.body.minimumSpend,
      maximumSpend: req.body.maximumSpend,
      discountType: req.body.discountType,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      is_active: req.body.enableStatus,
    };
    con.query(`insert into tbl_coupon set ?`, couponBody, (err, response) => {
      if (err) return next(err);
      res.json({ code: 1, message: "Coupon has been added Successfully" });
    });
  },
};

module.exports = couponController;
