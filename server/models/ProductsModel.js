const path = require("path");
const helper = require('../helpers/Helper.js');
const fs = require('fs');

const rawdata = path.resolve(__dirname, "../../public/data/products.json");
const data = JSON.parse(fs.readFileSync(rawdata, 'utf8'));
module.exports = {

  /**
   * Get All Products
   */
  getAllProducts() {
    return new Promise((resolve, reject) => {
      if (data.products.length === 0) {
        reject({
          message: 'no products available',
          status: 202
        })
      }
      resolve(data.products);
    })
  },

  /**
   *Gets specific product
   */
  getProduct(id) {
    return new Promise((resolve, reject) => {
      helper.mustBeInArray(data.products, id)
        .then(product => resolve(product))
        .catch(err => reject(err));
    })
  }
}
