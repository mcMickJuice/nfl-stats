// @flow

const transformStatHtml = require('./htmlMapper')
const compose = require('../compose')
const statsToRows = require('./statsToRows')

const statName = 'Receiving'
const statTableName = 'Receiving Stats'

const mapper = compose(statsToRows(statName), transformStatHtml(statTableName))

module.exports = mapper
