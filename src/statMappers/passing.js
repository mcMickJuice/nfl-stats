var cheerio = require('cheerio')

const parseStat = val => {
    //check if is number and not --

    return val;
}

const cellSelector = 'td';

const passingMapper = html => {
    const $ = cheerio.load(html);

    const statTablesSelector = '.mod-player-stats table'
    const passingTableSelector = ':contains("Passing Stats")';

    //grab Passing Table
    //TODO this is same for all stats. Move up to parent class. Perhaps function "selectStatTable"
    const passingTable = $(`${statTablesSelector}${passingTableSelector}`);

    //grab stat headers and values
    const colHeadSelector = 'tr.colhead'
    let headerValues = []
    $(colHeadSelector, passingTable).each((idx, elem) => {
        const headers = $(cellSelector, elem).map((idx, cell) => {
            return $(cell).text()
        }).get()
        headerValues = headers
    })

    //sanitize headers

    //grab stat rows and values
    const statRowSelector = 'tr.oddrow, tr.evenrow';
    const statsBySeason = [];
    $(statRowSelector,passingTable).each((idx, elem) => {
        
        const stats = $(cellSelector, elem).map((idx, cell) => {
            return $(cell).text()
        }).get()

        statsBySeason.push(stats);
    })

    
    //zip headers with each stat row
    return statsBySeason.map(seasonStat => {
        const season = seasonStat[0];
        const stats = seasonStat.map((stat, idx) => {
            return {
                statType: headerValues[idx],
                statValue: stat
            }
        })

        return {
            season,
            stats
        }
    })
}

module.exports = passingMapper;