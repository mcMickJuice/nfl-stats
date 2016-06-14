const sql = require('mssql');
const {DB_CONN_STRING} = require('./config')

const query = (query) => {
    return sql.connect(DB_CONN_STRING)
        .then(() => {
            return new sql.Request()
                .query(query)
        })
}

module.exports = {
    query
}