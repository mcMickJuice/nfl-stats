// @flow

const { getFromCache } = require('../cacheService')

const { get } = require('../httpClient')
const statMappers = require('../statMappers')

const getPlayerStatsBySeason = (playerId: string) => {
  //build Url
  const url = `http://espn.go.com/nfl/player/stats/_/id/${playerId}`

  //make stat requestStats
  return get(url)
    .then(
      res => res.text,
      err => {
        //if bad request, return unsuccessful request type
        const errObject = {
          message: `Error Requesting Html - ${url}`,
          error: err
        }

        return new Error(errObject)
      }
    )
    .then((html: string) => {
      //if good request, take body of request and pass through statMappers
      const stats = statMappers.map(fn => fn(html)).reduce((acc, next) => {
        return Object.assign({}, acc, next)
      }, {})

      return stats
    })
}

const searchPlayers = (searchTerm: string): Promise<RosterPlayer[]> => {
  return new Promise(resolve => {
    getFromCache('players').then((players: RosterPlayer[]) => {
      const searchTermLowerCase = searchTerm.toLowerCase()
      const foundPlayers = players.filter((p: RosterPlayer) => {
        return p.name.toLowerCase().indexOf(searchTermLowerCase) > -1
      })

      resolve(foundPlayers)
    })
  })
}

module.exports.getPlayerStatsBySeason = getPlayerStatsBySeason

module.exports.searchPlayers = searchPlayers
