const statsToRows  = require('../../src/statMappers/statsToRows')

const find = (arr, findFunc) => {
    return arr.filter(findFunc)[0];
}

const stats = [
    {statType: 'SEASON', statValue: '2009'},
    {statType: 'PASSING', statValue: '100'},
    {statType: 'PT', statValue: '4'},
    {statType: 'AWESOME', statValue: '2'},
]

const statSet = [
        {
            season: '2009',
            stats
        }
    ]

const statName = 'passing';

it('default filter filters out SEASON stattype', () => {
    const functionToTest = statsToRows(statName);

    const result = functionToTest(statSet);
    const processedStatSet = result[statName][0].stats;
    

    expect(Object.keys(processedStatSet).indexOf('season') === -1).toBe(true)
});

it('filter provided filters out provided stats', () => {
    const awesomeKeyword = 'awesome'
    const filterOutAwesome = statSet => statSet.statType.toLowerCase() !== awesomeKeyword;
    const functionToTest = statsToRows(statName, filterOutAwesome)

    const result = functionToTest(statSet);
    const processedStatSet = result[statName][0].stats;

    expect(Object.keys(processedStatSet).indexOf(awesomeKeyword) === -1).toBe(true)
});

it('custom processor processes each statSet', () => {
    const appendToItem = ' test';
    const processor = statSet => Object.assign({}, statSet, {
        statValue: `${statSet.statValue}${appendToItem}`
    });

    const functionToTest = statsToRows(statName, undefined, processor);

    const result = functionToTest(statSet);
    const processedStatSet = result[statName][0].stats;

    Object.keys(processedStatSet).forEach(key => {
        expect(processedStatSet[key].indexOf(appendToItem) > -1).toBe(true)
    })
});

it('transform {statType, statValue} to key value', () => {
    const functionToTest = statsToRows(statName);

    const result = functionToTest(statSet);
    const processedStatSet = result[statName][0].stats;

    Object.keys(processedStatSet).forEach(key => {
        const item = find(stats, stat => stat.statType.toLowerCase() === key);

        expect(item.statValue).toEqual(processedStatSet[key])
    })
})

it('returns object of key statName', () => {
    const functionToTest = statsToRows(statName);

    const result = functionToTest(statSet);

    expect(Object.keys(result)[0] === statName).toBe(true)
});
