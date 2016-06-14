const dbClient = require('./dbClient');

const searchPlayer = playerName => {
    //TODO santize this query!
    const query = `SELECT TOP 20 * 
                    FROM Players
                    WHERE PlayerName LIKE '${playerName}%'`

    return dbClient.query(query);
}

module.exports = {
    searchPlayer
}