// @flow

const transformStatHtml = require('./htmlMapper')
const compose = require('../compose')
const statsToRows = require('./statsToRows')

const statName = 'Defensive'
const statTableName = 'Defensive'

const mapper = compose(statsToRows(statName), transformStatHtml(statTableName))

module.exports = mapper
