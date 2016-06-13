const transformStatHtml = require('./htmlMapper')
const compose = require('../compose')
const statsToRows = require('./statsToRows')

const statName = 'Receiving'
const statTableName = 'Receiving Stats'

const mapper = compose(statsToRows(statName), transformStatHtml(statName, statTableName))

module.exports = mapper;