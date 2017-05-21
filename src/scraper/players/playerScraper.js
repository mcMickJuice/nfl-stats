// @flow

//purpose inject html, map to player records
//actually scrapes html
const cheerio = require('cheerio')

//http://www.espn.com/nfl/team/roster/_/name/dal/dallas-cowboys


//index of column for data
const tableIndex = {
  name: 1,
  position: 2,
  college: 7
}

//list of teams for requesting html
//prob in another file



const extractContentsFromTdByIndex = ($context, row, index) => {
  const td = $context('td', row)[index];

  return td;
}

const map: (($context: any, row: any, obj: Object) => void)[] = [
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

const processRow: ($context: any, row: any) => Object = ($context, row) => {
  const player = {};

  //go through mapping and pass in current row and player object
  map.forEach(m => {
    m($context, row, player)
  })

  return player
}

module.exports.scrapePlayersFromTeamTable = (html: string, team: string): RosterPlayer[] => {
  const $ = cheerio.load(html);
  const tableRowSelector = '#my-players-table table tr';

  //not stat head, not column head
  const tableRows = $(tableRowSelector).not('.stathead,.colhead');

  let players: RosterPlayer[] = [];
  tableRows.each((idx, row) => {
    const player = processRow($, row);
    player.team = team;
    players.push(player)
  })

  return players;
}