// @flow

const transformStatHtml = require('./htmlMapper')
const compose = require('../compose')
const statsToRows = require('./statsToRows')

const statName = 'Scoring'
const statTableName = 'Scoring Stats'

const mapper = compose(statsToRows(statName), transformStatHtml(statTableName))

module.exports = mapper
