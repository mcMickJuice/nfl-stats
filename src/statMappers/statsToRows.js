const seasonStatsToRows = seasonStats => {
    const {season, stats} = seasonStats;
    const rows = stats.reduce((acc, next) => {
        return Object.assign(acc, {
            [next.statType]: next.statValue
        })
    }, {})

    return {
        season,
        stats: rows
    }
}

const statSetToRows = statName => statSet => {
    const stats = statSet.map(seasonStatsToRows);
    return {
        [statName]: stats
    }
}

module.exports = statSetToRows