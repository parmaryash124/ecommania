const constant = require("../constant");
const con = require("../database");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");
const taxSchema = require("../validator/taxSchema");

const taxController = {
  async checkAvailabltiyofCategoryTax(categoryId, res, next) {
    return new Promise((resolve, reject) => {
      con.query(
        `select * from tbl_tax where categoryId=${categoryId}`,
        (err, response) => {
          if (err) return next(err);
          if (response.length > 0)
            return next(
              CustomErrorHandler.alreadyExist(
                "For this category tax is already added."
              )
            );
          resolve();
        }
      );
    });
  },

  async createtax(req, res, next) {
    try {
      const { error } = taxSchema.validate(req.body);
      await taxController.checkAvailabltiyofCategoryTax(
        req.body.categoryId,
        res,
        next
      );
      // 1 for percentage and 2 for fixed amount.
      if (error) return next(error);
      const taxbody = {
        categoryId: req.body.categoryId,
        taxType: req.body.taxType,
        taxValue: req.body.taxValue,
      };
      con.query(`insert into tbl_tax set ?`, taxbody, (err, response) => {
        if (err) return next(err);
        res.json({ code: 1, message: "Tax has been successfully added." });
      });
    } catch (e) {
      return next(e);
    }
  },

  async fetchTax(req, res, next) {
    try {
      const query = `select t.*,c.categoryName from tbl_tax t inner join tbl_category c on t.categoryId = c.id where t.is_active=1`;
      con.query(query, (err, response) => {
        if (err) return next(err);
        if (response.length == 0) return res.json(constant.dataNotFound);
        res.json({
          code: 1,
          message: "Fetch all taxes successfully",
          data: response,
        });
      });
    } catch (e) {
      return next(e);
    }
  },

  async editTax(req, res, next) {
    if (!req.body.taxId) {
      return next(CustomErrorHandler.fieldRequired("Tax id is required"));
    }
    // await taxController.checkAvailabltiyofCategoryTax(
    //   req.body.categoryId,
    //   res,
    //   next
    // );
    const taxbody = {
      categoryId: req.body.categoryId && req.body.categoryId,
      taxType: req.body.taxType && req.body.taxType,
      taxValue: req.body.taxValue && req.body.taxValue,
      is_active: req.body.is_active && req.body.is_active,
    };
    con.query(
      `update tbl_tax set ? where id=${req.body.taxId}`,
      taxbody,
      (err, respone) => {
        if (err) return next(err);
        res.json({ code: 1, message: "Tax has been updated successfully" });
      }
    );
  },

  async deleteTax(req, res, next) {
    if (!req.body.taxId) {
      return next(CustomErrorHandler.fieldRequired("Tax id is required"));
    }
    con.query(
      `delete from tbl_tax where id=${req.body.taxId}`,
      (err, response) => {
        if (err) return next(err);
        res.json({
          code: 1,
          message: "Tax for this category has been deleted.",
        });
      }
    );
  },
};

module.exports = taxController;
