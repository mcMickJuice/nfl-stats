const transformStatHtml = require('./htmlMapper')

const statName = 'Passing'
const statTableName = 'Passing Stats'

module.exports = transformStatHtml(statName, statTableName);