const con = require('../database');
const adminController = {
          async getUser(req, res, next) {
                    // con.query(`select * from tbl_user `, (err, result) => {
                    //           if (err) console.log(err)
                    //           console.log(result)
                    // })
          }
}
module.exports = adminController