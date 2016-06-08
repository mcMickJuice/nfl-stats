
var request = require('superagent')

const get = (url) => {
    const promise = new Promise((resolve, reject) => {
        request.get(url)
            .end((err, res) => {
                if (err) {
                    reject(err)
                    return;
                }

                resolve(res);
            })
    })

    return promise;
}

module.exports = {
    get
}