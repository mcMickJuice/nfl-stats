// @flow
const { get } = require('../../httpClient')
const { scrapePlayersFromTeamTable } = require('./playerScraper')

//purpose: makes request to ESPN.com for each team,
//maps html to player rows

export type Team = {
  teamKey: string,
  name: string
}

const teams: Team[] = [
  {
    teamKey: 'dal',
    name: 'Dallas Cowboys'
  },
  {
    teamKey: 'nyg',
    name: 'New York Giants'
  },
  {
    teamKey: 'phi',
    name: 'Philadelphia Eagles'
  },
  {
    teamKey: 'wsh',
    name: 'Washington Redskins'
  },
  {
    teamKey: 'ari',
    name: 'Arizona Cardinals'
  },
  {
    teamKey: 'lar',
    name: 'Los Angeles Rams'
  },
  {
    teamKey: 'dal',
    name: 'Dallas Cowboys'
  },
  {
    teamKey: 'sf',
    name: 'San Francisco 49ers'
  },
  {
    teamKey: 'sea',
    name: 'Seattle Seahawks'
  },
  {
    teamKey: 'chi',
    name: 'Chicago Bears'
  },
  {
    teamKey: 'det',
    name: 'Detroit Lions'
  },
  {
    teamKey: 'gb',
    name: 'Green Bay Packers'
  },
  {
    teamKey: 'min',
    name: 'Minnesota Vikings'
  },
  {
    teamKey: 'atl',
    name: 'Atlanta Falcons'
  },
  {
    teamKey: 'car',
    name: 'Carolina Panthers'
  },
  {
    teamKey: 'no',
    name: 'New Orleans Saints'
  },
  {
    teamKey: 'tb',
    name: 'Tampa Bay Buccaneers'
  },
  {
    teamKey: 'buf',
    name: 'Buffalo Bills'
  },
  {
    teamKey: 'mia',
    name: 'Miami Dolphins'
  },
  {
    teamKey: 'ne',
    name: 'New England Patriots'
  },
  {
    teamKey: 'nyj',
    name: 'New York Jets'
  },
  {
    teamKey: 'den',
    name: 'Denver Broncos'
  },
  {
    teamKey: 'kc',
    name: 'Kansas City Chiefs'
  },
  {
    teamKey: 'lac',
    name: 'Los Angeles Chargers'
  },
  {
    teamKey: 'oak',
    name: 'Oakland Raiders'
  },
  {
    teamKey: 'bal',
    name: 'Baltimore Ravens'
  },
  {
    teamKey: 'cin',
    name: 'Cincinnati Bengals'
  },
  {
    teamKey: 'cle',
    name: 'Cleveland Browns'
  },
  {
    teamKey: 'pit',
    name: 'Pittsburgh Steelers'
  },
  {
    teamKey: 'hou',
    name: 'Houston Texans'
  },
  {
    teamKey: 'ind',
    name: 'Indianapolis Colts'
  },
  {
    teamKey: 'jax',
    name: 'Jacksonville Jaguars'
  },
  {
    teamKey: 'ten',
    name: 'Tennessee Titans'
  },

]

const rosterUrl = (key: string) => `http://www.espn.com/nfl/team/roster/_/name/${key}/sort/lastName`;

module.exports.getCurrentPlayers = (): Promise<RosterPlayer[]> => {
  const teamTasks = teams.map(team => {
    const url = rosterUrl(team.teamKey);
    return get(url)
      .then(res => res.text)
      .then(html => {
        return scrapePlayersFromTeamTable(html, team.name);
      })
  })


  return Promise.all(teamTasks)
    .then(rostersByTeam => {
      return rostersByTeam.reduce((acc, next) => {
        return [...acc, ...next];
      })
    })
}
