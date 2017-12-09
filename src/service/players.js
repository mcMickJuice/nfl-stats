// @flow

const { getFromCache } = require('../cacheService')

module.exports.searchPlayers = (searchTerm: string): Promise<RosterPlayer[]> => {
  return new Promise((resolve) => {
    getFromCache('players').then((players: RosterPlayer[]) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      const foundPlayers = players.filter((p: RosterPlayer) => {
        return p.name.toLowerCase().indexOf(searchTermLowerCase) > -1
      })

      resolve(foundPlayers)
    })
  })
}
