const cheerio = require('cheerio');

const cellSelector = 'td';
const statTablesSelector = '.mod-player-stats table'
const colHeadSelector = 'tr.colhead'
const statRowSelector = 'tr.oddrow, tr.evenrow';

function transFormStatHtml(statName, statTableName) {
    return html => {
        console.log()
        const $ = cheerio.load(html);

        const tableSelector = `:contains("${statTableName}")`;

        const statTable = $(`${statTablesSelector}${tableSelector}`);

        //grab stat headers and values
        let headerValues = []
        $(colHeadSelector, statTable).each((idx, elem) => {
            const headers = $(cellSelector, elem).map((idx, cell) => {
                return $(cell).text()
            }).get()
            headerValues = headers
        })

        //sanitize headers

        //grab stat rows and values
        const statsBySeason = [];
        $(statRowSelector, statTable).each((idx, elem) => {

            const stats = $(cellSelector, elem).map((idx, cell) => {
                return $(cell).text()
            }).get()

            statsBySeason.push(stats);
        })

        //zip headers with each stat row
        const statGroup = statsBySeason.map(seasonStat => {
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

        return statGroup
    }
}

module.exports = transFormStatHtml