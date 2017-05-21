// @flow
const { getCurrentPlayers } = require('../scraper/players/getPlayersForTeams')
const fs = require('fs')
const path = require('path')

module.exports = (outputDir: string) => {
  return getCurrentPlayers()
    .then((players: RosterPlayer[]) => {

      const fileName = path.join(outputDir, 'players.json')
      const playersString = JSON.stringify(players, null, 2);

      return new Promise((resolve, reject) => {
        fs.writeFile(fileName, playersString, { encoding: 'utf8' }, err => {
          if (err) {
            reject(err)
            return
          }

          resolve()
        })

      })
    })
    .catch(err => console.error(err))
}