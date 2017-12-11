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

module.exports.scrapeSeasonStatsForPlayer = (
  id: number
): Promise<PlayerSeasonStats> => {
  const url = `http://www.espn.com/nfl/player/stats/_/id/${id}`
  const playerSeasonStats: PlayerSeasonStats = { id }
  return Promise.resolve(playerSeasonStats)
}
