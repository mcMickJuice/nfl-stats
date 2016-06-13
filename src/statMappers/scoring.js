var transformStatHtml = require('./htmlMapper')

const statName = 'Scoring'
const statTableName = 'Scoring Stats'

module.exports = transformStatHtml(statName, statTableName);