const fs = require('fs');

module.exports = {

  getNewId(array) {
    if (array.length > 0) {
      return array[array.length - 1].id + 1;
    } else {
      return 1;
    }
  },

  mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
      const row = array.find(r => r.id == id)
      if (!row) {
        reject({
          message: 'ID is not good',
          status: 404
        })
      }
      resolve(row)
    })
  },

  writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
      if (err) {
        console.log(err)
      }
    })
  }
}
