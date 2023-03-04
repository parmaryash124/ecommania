const con = require("../database");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");
const constant = require("../constant/index");
const subCategoryController = {
  async addsubCategory(req, res, next) {
    if (!req.body.mainCategoryId || !req.body.subCategoryName) {
      return next(
        CustomErrorHandler.fieldRequired(
          "main category Id && sub category field is required."
        )
      );
    }
    try {
      con.query(
        `insert into tbl_sub_category set ?`,
        {
          categoryId: req.body.mainCategoryId,
          subCategoryName: req.body.subCategoryName,
        },
        (err, response) => {
          if (err) return next(err);
          res.json({
            code: 1,
            message: "Sub category has been added successfully",
          });
        }
      );
    } catch (error) {
      return next(error);
    }
  },

  async editsubCategory(req, res, next) {
    if (!req.body.subCategoryId || !req.body.subCategoryName) {
      return next(
        CustomErrorHandler.fieldRequired(
          "sub category Id && sub category field is required."
        )
      );
    }
    con.query(
      `update tbl_sub_category set ? where id=${req.body.subCategoryId}`,
      { subCategoryName: req.body.subCategoryName },
      (err, response) => {
        if (err) return next(err);
        if (response.affectedRows == 0)
          return res.json({ code: 0, message: "Sub category Id not found" });
        res.json({
          code: 1,
          message: "Sub Category has been updated successfully",
        });
      }
    );
  },

  async deletesubCategory(req, res, next) {
    if (!req.body.subCategoryId) {
      return next(
        CustomErrorHandler.fieldRequired("sub category Id field is required.")
      );
    }
    con.query(
      `update tbl_sub_category set ? where id=${req.body.subCategoryId}`,
      { is_active: 0 },
      (err, response) => {
        if (err) return next(err);
        res.json({
          code: 1,
          message: "Sub Category has been delete successfully",
        });
      }
    );
  },

  async getSubCategories(req, res, next) {
    try {
      if (!req.body.limit || !req.body.page)
        return next(
          CustomErrorHandler.fieldRequired("page & limit field is required..`")
        );
      // if (!req.body.CategoryId)
      //   return next(
      //     CustomErrorHandler.fieldRequired("Category Id is requied..")
      //   );
      // limit ${req.body.limit} offset ${req.body.page}

      let page_token = Number(req.body.page);
      let offset = `offset`;
      let offsetValue =
        page_token * Number(req.body.limit) - Number(req.body.limit);
      let search = ``;

      if (req.body.search && req.body.search != "") {
        search = `and subCategoryName like "${`%${req.body.search}%`}"`;
        offset = ``;
        offsetValue = ``;
      }

      let categoryId = ``;
      if (req.body.CategoryId)
        categoryId = `and  categoryId=${req.body.CategoryId}`;

      let r = con.query(
        `select * from tbl_sub_category where is_active=1 ${categoryId} ${search} order by id limit ${req.body.limit}  ${offset} ${offsetValue}`,
        (err, response) => {
          // console.log(r.sql)
          if (err) return next(err);
          if (response.length == 0) return res.json(constant.dataNotFound);
          res.json({
            code: 1,
            message: "Sub Category has been fetched successfully",
            data: response,
            page: page_token + 1,
          });
        }
      );
    } catch (error) {
      return next(error);
    }
  },

  async getsubCategoryById(req, res, next) {
    try {
      if (!req.params.subcategoryId) {
        return next(
          CustomErrorHandler.fieldRequired("category id is required")
        );
      }
      con.query(
        `SELECT * from tbl_sub_category  where is_active=1`,
        (err, response) => {
          if (err) return next(err);
          if (response.length == 0) return res.json(constant.dataNotFound);
          return res.json({
            code: 1,
            message: "Category has been fetched successfully",
            data: response[0],
          });
        }
      );
    } catch (e) {
      return next(e);
    }
  },
};

module.exports = subCategoryController;
