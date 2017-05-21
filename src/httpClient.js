const request = require('superagent')

module.exports.get = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url)
      .end((err, res) => {
        if (err) {
          reject(err)
          return;
        }

        resolve(res);
      })
  })
}