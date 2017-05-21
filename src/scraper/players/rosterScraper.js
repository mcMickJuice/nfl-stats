// @flow

const cheerio = require('cheerio')
const tableIndex = {
  name: 1,
  position: 2,
  college: 7
}

const extractContentsFromTdByIndex = ($context, row, index) => {
  const td = $context('td', row)[index];

  return td;
}

export type RosterPlayerMapper = ($context: any, row: any, obj: Object) => void;

const nameAndIdMapper: RosterPlayerMapper = ($context, row, obj) => {
  const td = extractContentsFromTdByIndex($context, row, tableIndex.name);

  const $anchor = $context('a', td)

  //http://www.espn.com/nfl/player/_/id/2515345/richard-ash
  const href = $anchor.attr('href')
  const pattern = /\/id\/(\d+)\//
  const id = href.match(pattern)[1];
  obj.id = Number(id)
  obj.name = $anchor.text();
}

const positionMapper: RosterPlayerMapper = ($context, row, obj) => {
  const td = extractContentsFromTdByIndex($context, row, tableIndex.position);

  obj.position = $context(td).text()
}

const collegeMapper: RosterPlayerMapper = ($context, row, obj) => {
  const td = extractContentsFromTdByIndex($context, row, tableIndex.college)

  obj.college = $context(td).text()
}

const rosterPlayerMappers: RosterPlayerMapper[] = [
  nameAndIdMapper,
  positionMapper,
  collegeMapper
]

const processRow: ($context: any, row: any) => Object = ($context, row) => {
  const player = {};

  rosterPlayerMappers.forEach(mappers => {
    mappers($context, row, player)
  })

  return player
}

module.exports.scrapePlayersFromTeamRoster = (html: string, team: string): RosterPlayer[] => {
  const $ = cheerio.load(html);
  const tableRowSelector = '#my-players-table table tr';

  //table has two extra headers
  const tableRows = $(tableRowSelector).not('.stathead,.colhead');

  let players: RosterPlayer[] = [];
  tableRows.each((idx, row) => {
    const player = processRow($, row);
    player.team = team;
    players.push(player)
  })

  return players;
}