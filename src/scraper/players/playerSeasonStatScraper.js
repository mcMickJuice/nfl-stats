// @flow

// http://www.espn.com/nfl/player/stats/_/id/8439/aaron-rodgers

type SeasonStatBase = {
  season: number,
  teamId: string,
  gamesPlayed: number
}

type PassingStat = {
  completions: number,
  attempts: number,
  completionPercentage: number,
  yards: number,
  average: number,
  touchdowns: number,
  long: number,
  interceptions: number,
  fumbles: number,
  qbr: number,
  passerRating: number
}

type RushingStat = {
  attempts: number,
  yards: number,
  average: number,
  touchdowns: number,
  long: number,
  firstDowns: number,
  fumbles: number,
  fumblesLost: number
}

type ReceivingStat = {
  receptions: number,
  yards: number,
  average: number,
  touchdowns: number,
  long: number,
  firstDowns: number,
  fumbles: number,
  fumblesLost: number,
  targets: number
}

type ScoringStat = {
  passing: number,
  rushing: number,
  receiving: number,
  kickReturn: number,
  twoPointConversions: number,
  pat: number
}

type DefensiveStat = {
  combinedTackles: number,
  totalTackles: number,
  assistedTackles: number,
  sacks: number,
  forcedFumbles: number,
  fumbleRecoveries: number,
  fumberReturnYards: number,
  interceptions: number,
  interceptionReturnYards: number,
  interceptionReturnLong: number,
  interceptionReturnTouchdowns: number,
  passesDefended: number
}

type PassingSeasonStat = PassingStat & SeasonStatBase
type RushingSeasonStat = RushingStat & SeasonStatBase
type ReceivingSeasonStat = ReceivingStat & SeasonStatBase
type ScoringSeasonStat = ScoringStat & SeasonStatBase
type DefensiveSeasonStat = DefensiveStat & SeasonStatBase

type PlayerSeasonStats = {
  id: number,
  passingStats?: PassingSeasonStat[],
  rushingStats?: RushingSeasonStat[],
  receivingStats?: ReceivingSeasonStat[],
  scoringStats?: ScoringSeasonStat[],
  defensiveStats?: DefensiveSeasonStat[]
}

/**
 * 
 * select all table.tablehead elements
 * remove first and last tables (these are not stat tables)
 * grab stat type from tr.stathead>td:first-child text() to get ${statType} Stats 
 * grab all trs that are not stathead, colhead and total
 * most columns are simple cells except for the team column, which you need 
 * to grab the team id out of
 * td li.team-name > a - get href and parse the team abbreviation out of
 * url
 * <td>
  <ul class="game-schedule">
    <li class="team-logo-small logo-nfl-small nfl-small-9">
      <a href="http://www.espn.com/nfl/team/_/name/gb/green-bay-packers"></a>
    </li>
    <li class="team-name">
      <a href="http://www.espn.com/nfl/team/_/name/gb/green-bay-packers">GB</a>
    </li>
  </ul>
</td>
 */

const textToNumber = (value: string): number => {
  if (isNaN(value)) {
    return 0
  }

  return Number(value)
}

const parseTeamValue = (value: string): string => {
  //   <td>
  //   <ul class="game-schedule">
  //     <li class="team-logo-small logo-nfl-small nfl-small-9">
  //       <a href="http://www.espn.com/nfl/team/_/name/gb/green-bay-packers"></a>
  //     </li>
  //     <li class="team-name">
  //       <a href="http://www.espn.com/nfl/team/_/name/gb/green-bay-packers">GB</a>
  //     </li>
  //   </ul>
  // </td>
  throw new Error('not implemented')
}

const passingColumnMapping = {
  '0': 'season',
  '1': 'team', //special
  '2': 'gamesPlayed',
  '3': 'completions',
  '4': 'attempts',
  '5': 'completionPct',
  '6': 'yards',
  '7': 'average',
  '8': 'touchdowns',
  '9': 'long',
  '10': 'interceptions',
  '11': 'fumbles',
  '12': 'qbr',
  '13': 'qbRating'
}

module.exports.scrapeSeasonStatsForPlayer = (
  id: number
): Promise<PlayerSeasonStats> => {
  const url = `http://www.espn.com/nfl/player/stats/_/id/${id}`
  const playerSeasonStats: PlayerSeasonStats = { id }
  return Promise.resolve(playerSeasonStats)
}
