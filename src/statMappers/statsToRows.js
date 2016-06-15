const seasonStatsToRows = seasonStats => {
    const {season, stats} = seasonStats;
    const rows = stats.reduce((acc, next) => {
        const statType = next.statType.toLowerCase();
        return Object.assign(acc, {
            [statType]: next.statValue
        })
    }, {})

    return {
        season,
        stats: rows
    }
}

const processStats = (filter, processor) => {
    return seasonStats => {
        const {season, stats} = seasonStats;
        const rows = stats
        .filter(seasonStatFilter)
        .filter(filter)
        .map(processor)
        .reduce((acc, next) => {
            const statType = next.statType.toLowerCase();
            return Object.assign(acc, {
                [statType]: next.statValue
            })
        }, {})

        return {
            season,
            stats: rows
        }
    }
}

const seasonStatFilter = statSet => statSet.statType.toLowerCase() !== 'season'
const noopFilter = () => true;
const noopProcessor = e => e;

const statSetToRows = (statName
, filter = noopFilter
, statSetProcessor = noopProcessor) => statSet => {
    const stats = statSet.map(processStats(filter,statSetProcessor));
    return {
        [statName]: stats
    }
}

module.exports = statSetToRows