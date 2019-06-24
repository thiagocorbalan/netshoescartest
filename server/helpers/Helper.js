module.exports = {
  mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
      const row = array.find(r => r.id == id);
      if (!row) {
        reject({
          message: 'ID is not good',
          status: 404
        })
      }
      resolve(row)
    })
  }
}
