const con = require("../database");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");
const constant = require("../constant/index");
const categoryController = {
  async addCategory(req, res, next) {
    if (!req.body.categoryName)
      return next(
        CustomErrorHandler.fieldRequired("category Name field is required...")
      );
    try {
      con.query(
        `insert into tbl_category set ?`,
        { categoryName: req.body.categoryName },
        (err, response) => {
          if (err) return next(err);
          res.json({
            code: 1,
            message: "Category has been added successfully",
          });
        }
      );
    } catch (err) {
      return next(err);
    }
  },

  async editCategory(req, res, next) {
    if (!req.body.categoryId || !req.body.categoryName) {
      return next(
        CustomErrorHandler.fieldRequiremnmd("category Id field is required...")
      );
    }
    try {
      con.query(
        `update tbl_category set ? where id=${req.body.categoryId}`,
        { categoryName: req.body.categoryName },
        (err, response) => {
          if (err) return next(err);
          if (response.affectedRows == 0)
            return res.json({ code: 0, message: "Category Id not found" });
          res.json({ code: 1, message: "Category has been edit successfully" });
        }
      );
    } catch (err) {
      return next(err);
    }
  },

  async deleteCategory(req, res, next) {
    if (!req.body.categoryId) {
      return next(
        CustomErrorHandler.fieldRequired("category Id field is required...")
      );
    }
    try {
      con.query(
        `update tbl_category set ? where id=${req.body.categoryId}`,
        { is_active: 0 },
        (err, response) => {
          if (err) return next(err);
          res.json({
            code: 1,
            message: "Category has been deleted successfully",
          });
        }
      );
    } catch (err) {
      return next(err);
    }
  },

  async getCategories(req, res, next) {
    try {
      if (!req.body.limit || !req.body.page)
        return next(
          CustomErrorHandler.fieldRequired("page & limit field is required..`")
        );

      // const page = req.body.page ? req.body.page : 1;
      // const limit = req.body.limit ? req.body.limit : 10;
      // const skip = (page - 1) * limit;

      let page_token = Number(req.body.page);
      let offset = `offset`;
      let offsetValue =
        page_token * Number(req.body.limit) - Number(req.body.limit);
      let search = ``;

      if (req.body.search && req.body.search != "") {
        search = `and categoryName like "${`%${req.body.search}%`}"`;
        offset = ``;
        offsetValue = ``;
      }

      con.query(
        `SELECT * from tbl_category  where is_active=1 ${search} order by id limit ${req.body.limit}  ${offset} ${offsetValue} `,
        (err, response) => {
          if (err) return next(err);
          if (response.length == 0) return res.json(constant.dataNotFound);
          return res.json({
            code: 1,
            message: "Category has been fetched successfully",
            data: response,
            page: page_token + 1,
          });
        }
      );
    } catch (error) {
      return next(error);
    }
  },

  async getCategoryById(req, res, next) {
    try {
      if (!req.params.categoryId) {
        return next(
          CustomErrorHandler.fieldRequired("category id is required")
        );
      }
      con.query(
        `SELECT * from tbl_category  where is_active=1`,
        (err, response) => {
          if (err) return next(err);
          if (response.length == 0) return res.json(constant.dataNotFound);
          return res.json({
            code: 1,
            message: "Sub Category has been fetched successfully",
            data: response[0],
          });
        }
      );
    } catch (e) {
      return next(e);
    }
  },
};

module.exports = categoryController;
