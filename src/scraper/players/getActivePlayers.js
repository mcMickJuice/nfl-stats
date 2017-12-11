// @flow
const { get } = require('../../httpClient')
const { scrapePlayersFromTeamRoster } = require('./rosterScraper')
const { teams } = require('../../constant')

const rosterUrl = (key: string) =>
  `http://www.espn.com/nfl/team/roster/_/name/${key}/sort/lastName`

module.exports.getPlayersFromRosters = (): Promise<RosterPlayer[]> => {
  const teamTasks = teams.map(team => {
    const url = rosterUrl(team.teamKey)
    return get(url)
      .then(res => res.text)
      .then(html => {
        return scrapePlayersFromTeamRoster(html, team.name)
      })
  })

  return Promise.all(teamTasks).then(rostersByTeam => {
    return rostersByTeam.reduce((acc, next) => {
      return [...acc, ...next]
    })
  })
}
