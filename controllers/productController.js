const con = require("../database");
const CustomErrorHandler = require("../middlewares/CustomErrorHandler");
const productSchema = require("../validator/productSchema");
const constant = require("../constant/index");
const productController = {
  async addProduct(req, res, next) {
    const { error } = productSchema.validate(req.body);
    if (error) return next(error);
    try {
      let data = { ...req.body, imageName: req.file.filename };
      con.query(`insert into tbl_product set ?`, data, (err, response) => {
        if (err) return next(err);

        res.json({
          code: 1,
          message: "Product has been added successfully",
          upload_image_url: `http://localhost:4000/images/${req.file.filename}`,
        });
      });
    } catch (error) {
      return next(error);
    }
  },

  async editProduct(req, res, next) {
    if (!req.params.productId) {
      return next(CustomErrorHandler.fieldRequired("product is required"));
    }
    const data = {
      productName: req.body.productName && req.body.productName,
      categoryId: req.body.categoryId && req.body.categoryId,
      subcategoryId: req.body.subcategoryId && req.body.subcategoryId,
      price: req.body.price && req.body.price,
      description: req.body.description && req.body.description,
      sku: req.body.sku && req.body.sku,
      metaTitle: req.body.metaTitle && req.body.metaTitle,
      metaDesc: req.body.metaDesc && req.body.metaDesc,
      imageAlt: req.body.imageAlt && req.body.imageAlt,
      qty: req.body.qty && req.body.qty,
      returnPolicy: req.body.returnPolicy && req.body.returnPolicy,
      enableDeals: req.body.enableDeals && req.body.enableDeals,
      imageName: req.file.filename && req.file.filename,
    };
    con.query(
      `update tbl_product set ?  where id=${req.params.productId}`,
      data,
      (err, response) => {
        if (err) return next(err);
        res.json({ code: 1, message: "Product has been updated successfully" });
      }
    );
  },

  async deleteProduct(req, res, next) {
    if (!req.body.productId)
      return next(CustomErrorHandler.fieldRequired("Product Id is required."));
    con.query(
      `update tbl_product set ? where id=${req.body.productId}`,
      { is_active: 0 },
      (err, response) => {
        if (err) return next(err);
        res.json({ code: 1, message: "Product has been deleted successfully" });
      }
    );
  },

  async fetchProducts(req, res, next) {
    if (!req.body.limit || !req.body.page)
      return next(
        CustomErrorHandler.fieldRequired("page & limit field is required...`")
      );

    let page_token = Number(req.body.page);
    let offset = `offset`;
    let offsetValue =
      page_token * Number(req.body.limit) - Number(req.body.limit);
    let search = ``;

    if (req.body.search && req.body.search != "") {
      search = `and productName like "${`%${req.body.search}%`}" || description like "${`%${req.body.search}%`}"`;
      offset = ``;
      offsetValue = ``;
    }
    con.query(
      `SELECT p.*,
        CONCAT("${constant.imageUrl}",p.imageName) as imageUrl,
      IFNULL(t.categoryId,p.categoryId) as categoryId,
        IFNULL(t.taxType,0) as taxType,
          IFNULL(t.taxValue,0) as taxValue 
            from tbl_product p left join tbl_tax t on p.categoryId = t.categoryId  
            where p.is_active=1 ${search} order by p.id desc limit ${req.body.limit} ${offset} ${offsetValue}`,
      (err, response) => {
        if (err) return next(err);
        if (response.length == 0) return res.json(constant.dataNotFound);
        res.json({
          code: 1,
          message: "fetch products",
          data: response ? response : [],
          page: page_token + 1,
        });
      }
    );
  },

  async productbyId(req, res, next) {
    if (!req.params.id) {
      return next(CustomErrorHandler.fieldRequired("product id is required.."));
    }
    con.query(
      `select p.*,
      CONCAT("${constant.imageUrl}",p.imageName) as imageUrl,
      IFNULL(t.categoryId,p.categoryId) as categoryId,
        IFNULL(t.taxType,0) as taxType,
          IFNULL(t.taxValue,0)  as taxValue 
            from tbl_product p left join tbl_tax t on p.categoryId = t.categoryId  
            where p.is_active=1 and p.id=${req.params.id}`,
      (err, response) => {
        if (err) return next(err);
        res.json({
          code: 1,
          message: "fetch products",
          data: response[0] ? response[0] : {},
        });
      }
    );
  },
};

module.exports = productController;
