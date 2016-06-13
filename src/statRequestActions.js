var {get} = require('./httpClient')
var statMappers = require('./statMappers')

const requestStats = (playerId, err) => {
    //build Url
    const url = `http://espn.go.com/nfl/player/stats/_/id/${playerId}`

    //make stat requestStats
    return get(url)
        .then(res => res.text
        , err => {
            //if bad request, return unsuccessful request type
            const errObject = {
                message: `Error Requesting Html - ${url}`,
                error: err
            }

            return new Error(errObject);
        })
        .then(html => {
            //if good request, take body of request and pass through statMappers
            const stats = statMappers
                .map(fn => fn(html))
                .reduce((acc, next) => {
                    return Object.assign({}, acc, next);
                }, {});

            return stats;
        })
}

module.exports = {
    requestStats
}