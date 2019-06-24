const productsModel = require('./../models/ProductsModel');

module.exports = {
  /**
   * Get All Products
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    await productsModel.getAllProducts()
    .then(products => {
      res.json(products)
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
  },

  /**
   * Gets specific product
   * @param {*} req
   * @param {*} res
   */
  async detail(req, res){
    const id = req.params.id;

     await productsModel.getProduct(id)
    .then(product => res.json(product))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })

  }
}
