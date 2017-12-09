// @flow
import type { Team } from '../scraper/players/getActivePlayers';

const { getFromCache } = require('../cacheService')

function getRosterForTeam(team: Team): Promise<RosterPlayer[]> {


  return getFromCache('players')
    .then((players: RosterPlayer[]) => {
      return players.filter(p => p.team === team.name)
    })
}

module.exports.getRosterForTeam = getRosterForTeam