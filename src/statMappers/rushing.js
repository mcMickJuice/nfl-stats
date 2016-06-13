const transformStatHtml = require('./htmlMapper')
const compose = require('../compose')
const statsToRows = require('./statsToRows')

const statName = 'Rushing'
const statTableName = 'Rushing Stats'

const mapper = compose(statsToRows(statName), transformStatHtml(statName, statTableName))

module.exports = mapper;