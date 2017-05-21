const Koa = require('koa');
const _ = require('koa-route')
const { requestStats } = require('./statRequestActions')
const { searchPlayer } = require('./playerQueries')
const jsonFormatter = require('./middleware/jsonFormatter')

const app = new Koa();

app.use(jsonFormatter())

app.use(function* (next) {
  console.log(this.url)

  yield next
})

app.use(_.get('/api/player', getPlayersByName))

app.use(_.get('/api/stats/:id', getById))

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`)
});

function* getPlayersByName(query) {
  const { playerName } = this.query
  const records = yield searchPlayer(playerName);

  this.body = records;
}

function* getById(id) {
  const _id = Number(id);

  if (isNaN(_id)) {
    this.throw(`Value provided is not a Number ${id}`, 400)
  }

  const stats = yield requestStats(_id, err => {
    console.log('an error occurred')
  });

  this.body = stats;
}