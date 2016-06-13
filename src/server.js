const Koa = require('koa');
const _ = require('koa-route')
const {requestStats} = require('./statRequestActions')

const app = new Koa();

app.use(_.get('/api/:id', getById))

app.listen(5000, () => {
    console.log('listening on port 5000')
});

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