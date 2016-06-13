const transformStatHtml = require('./htmlMapper')

const statName = 'Rushing'
const statTableName = 'Rushing Stats'

module.exports = transformStatHtml(statName, statTableName);