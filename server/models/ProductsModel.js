const path = require("path");
const helper = require('../helpers/Helper.js');

const filename = path.resolve(__dirname, "..", "..", "public", "data", "products.json");
let data = require(filename);

module.exports = {

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

  getProduct(id) {
    return new Promise((resolve, reject) => {
      helper.mustBeInArray(data.products, id)
        .then(product => resolve(product))
        .catch(err => reject(err));
    })
  }
}
