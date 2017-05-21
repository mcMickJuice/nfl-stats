// @flow
const cheerio = require('cheerio')

export type Team = {
  // id: String,
  teamKey: string,
  name: string
}

//http://www.espn.com/nfl/team/roster/_/name/dal/dallas-cowboys

const rosterUrl = (key: string) => `http://www.espn.com/nfl/team/roster/_/name/${key}/sort/lastName`;

export type RosterPlayer = {
  name?: string,
  id?: number,
  team?: string,
  position?: string,
  college?: string
}

//index of column for data
const tableIndex = {
  name: 1,
  position: 2,
  college: 7
}

//list of teams for requesting html
//prob in another file
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


const extractContentsFromTdByIndex = ($context, row, index) => {
  const td = $context('td', row)[index];

  return td;
}

const map: (($context: any, row: any, obj: RosterPlayer) => void)[] = [
  ($context, row, obj) => {
    //name and id
    const td = extractContentsFromTdByIndex($context, row, tableIndex.name);

    const $anchor = $context('a', td)

    //http://www.espn.com/nfl/player/_/id/2515345/richard-ash
    const href = $anchor.attr('href')
    const pattern = /\/id\/(\d+)\//
    const id = href.match(pattern)[1];
    obj.id = Number(id)
    obj.name = $anchor.text();
  },
  ($context, row, obj) => {
    //position
    const td = extractContentsFromTdByIndex($context, row, tableIndex.position);

    obj.position = $context(td).text()
  },
  ($context, row, obj) => {
    //college
    const td = extractContentsFromTdByIndex($context, row, tableIndex.college)

    obj.college = $context(td).text()
  },
]

const processRow: ($context: any, row: any) => RosterPlayer = ($context, row) => {
  const player: RosterPlayer = {};

  //go through mapping and pass in current row and player object
  map.forEach(m => {
    m($context, row, player)
  })

  return player
}

const mapTableToPlayers = (html: string) => {
  const $ = cheerio.load(html);
  //not stat head, not column head
  const tableRowSelector = '#my-players-table table tr';

  const tableRows = $(tableRowSelector);

  let players: RosterPlayer[] = [];
  tableRows.each((idx, row) => {
    const player = processRow(row);
    players.push(player)
  })

  return players;
}

module.exports = mapTableToPlayers