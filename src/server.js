/* eslint-disable no-console */

const Koa = require('koa')
const _ = require('koa-route')
const jsonFormatter = require('./middleware/jsonFormatter')
const { searchPlayers, getPlayerStatsBySeason } = require('./service/players')
const { existsInCache, addToCache } = require('./cacheService')
const { getPlayersFromRosters } = require('./scraper/players/getActivePlayers')
const { teams } = require('./constant.js')
const { getRosterForTeam } = require('./service/teams')

const app = new Koa()

app.use(jsonFormatter())

app.use(function*(next) {
  const playerKey = 'players'
  const doPlayersExists = yield existsInCache(playerKey)

  if (!doPlayersExists) {
    const players = yield getPlayersFromRosters()

    yield addToCache(playerKey, players)
  }

  yield next
})

app.use(_.get('/api/players', getPlayersByName))

app.use(_.get('/api/players/:id/stats', getById))

app.use(_.get('/api/teams/:team', getTeamRoster))

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

function* getTeamRoster(team) {
  const lowerCase = team.toLowerCase()
  const foundTeam = teams.find(t => t.teamKey.toLowerCase() === lowerCase)

  if (foundTeam == null) {
    this.body = 'BAD'
    return
  }

  const roster = yield getRosterForTeam(foundTeam)

  this.body = roster
}

function* getPlayersByName() {
  const { searchTerm } = this.query
  const records = yield searchPlayers(searchTerm)

  this.body = records
}

function* getById(id) {
  const _id = Number(id)

  if (isNaN(_id)) {
    this.throw(`Value provided is not a Number ${id}`, 400)
  }

  const stats = yield getPlayerStatsBySeason(_id, () => {
    console.log('an error occurred')
  })

  this.body = stats
}
