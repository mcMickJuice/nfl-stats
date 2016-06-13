const passing = require('./passing')
const rushing = require('./rushing')
const receiving = require('./receiving')
const scoring = require('./scoring')
const defensive = require('./defensive')

const mappers = [
    passing,
    rushing,
    receiving,
    scoring,
    defensive
] 

module.exports = mappers