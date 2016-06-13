const transformStatHtml = require('./htmlMapper')

const statName = 'Receiving'
const statTableName = 'Receiving Stats'

module.exports = transformStatHtml(statName, statTableName);