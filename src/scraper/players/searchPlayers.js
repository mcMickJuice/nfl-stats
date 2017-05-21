// @flow

const fs = require('fs')
const path = require('path')

module.exports = (searchTerm: string): Promise<RosterPlayer[]> => {
  const filePath = path.resolve(__dirname, '../../../output/players.json')
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        const players = JSON.parse(data);
        const searchTermLowerCase = searchTerm.toLowerCase();
        const foundPlayers = players.filter((p: RosterPlayer) => {
          return p.name.toLowerCase().indexOf(searchTermLowerCase) > -1
        })

        resolve(foundPlayers)
      }
    })
  })
}