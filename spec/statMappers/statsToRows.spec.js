import test from 'ava';
import statsToRows from'../../src/statMappers/statsToRows'

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

test('default filter filters out SEASON stattype', t => {
    const functionToTest = statsToRows(statName);

    const result = functionToTest(statSet);
    const processedStatSet = result[statName][0].stats;
    

    t.true(Object.keys(processedStatSet).indexOf('season') === -1)
});

test('filter provided filters out provided stats', t => {
    const awesomeKeyword = 'awesome'
    const filterOutAwesome = statSet => statSet.statType.toLowerCase() !== awesomeKeyword;
    const functionToTest = statsToRows(statName, filterOutAwesome)

    const result = functionToTest(statSet);
    const processedStatSet = result[statName][0].stats;

    t.true(Object.keys(processedStatSet).indexOf(awesomeKeyword) === -1)
});

test('custom processor processes each statSet', t => {
    const appendToItem = ' test';
    const processor = statSet => Object.assign({}, statSet, {
        statValue: `${statSet.statValue}${appendToItem}`
    });

    const functionToTest = statsToRows(statName, undefined, processor);

    const result = functionToTest(statSet);
    const processedStatSet = result[statName][0].stats;

    Object.keys(processedStatSet).forEach(key => {
        t.true(processedStatSet[key].indexOf(appendToItem) > -1)
    })
});

test('transform {statType, statValue} to key value', t => {
    const functionToTest = statsToRows(statName);

    const result = functionToTest(statSet);
    const processedStatSet = result[statName][0].stats;

    Object.keys(processedStatSet).forEach(key => {
        const item = find(stats, stat => stat.statType.toLowerCase() === key);

        t.deepEqual(item.statValue, processedStatSet[key])
    })
})

test('returns object of key statName', t => {
    const functionToTest = statsToRows(statName);

    const result = functionToTest(statSet);

    t.true(Object.keys(result)[0] === statName)
});
