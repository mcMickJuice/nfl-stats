const Koa = require('koa');
const _ = require('koa-route')
const {requestStats} = require('./statRequestActions')
const {searchPlayer} = require('./playerQueries')
const jsonFormatter = require('./middleware/jsonFormatter')

const app = new Koa();

app.use(jsonFormatter())

app.use(_.get('/api/player', getPlayersByName))

app.use(_.get('/api/stats/:id', getById))

app.listen(5000, () => {
    console.log('listening on port 5000')
});

function * getPlayersByName(query) {
    const {playerName} = this.query
    const records = yield searchPlayer(playerName);

    this.body = records;
}

function * getById(id) {
    const _id = Number(id);

    if(isNaN(_id)) {
        this.throw(`Value provided is not a Number ${id}`, 400)
    }

    const stats = yield requestStats(_id, err => {
        console.log('an error occurred')
    });

    this.body = stats;
}