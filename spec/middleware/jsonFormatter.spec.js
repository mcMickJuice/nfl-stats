const test = require('ava')
const jsonFormatter = require('../../src/middleware/jsonFormatter')

let middleware;
test.beforeEach(() => {
    middleware = jsonFormatter();
})

const runMiddlewareWithContext = (middlewareFn, context) => {
    middlewareFn = middlewareFn.bind(context);
    const genFn = middlewareFn();
    //run to completion
    for (var i of genFn) { }
}

test('will not format calls not to /api', t => {
    const originalBody = {
        Hi: 'hey',
        HowAreYa: 'oh hi'
    }
    const context = {
        url: '',
        body: originalBody
    }

    runMiddlewareWithContext(middleware, context)

    t.deepEqual(context.body, originalBody)
})

test('format bodies of calls to /api', t => {
    const originalBody = {
        Hey: 'hi',
        Hi: 'hey',
        HowAreYa: 'howareya'
    }

    const originalBodyKeys = ['hey', 'hi', 'howAreYa'];

    const context = {
        url: '/api/players',
        body: originalBody
    }

    runMiddlewareWithContext(middleware, context)

    t.not(originalBody, context.body)
})

test('camelCase keys of response body', t => {
    const originalBody = {
        Hey: 'hi',
        Hi: 'hey',
        HowAreYa: 'howareya'
    }

    const originalBodyKeys = ['hey', 'hi', 'howAreYa'];

    const context = {
        url: '/api/players',
        body: originalBody
    }

    runMiddlewareWithContext(middleware, context)

    Object.keys(context.body).forEach(key => {
        t.true(originalBodyKeys.indexOf(key) > -1)
    })
})

test('camelCase keys of response body if array', t => {
    const originalBody = {
        Hey: 'hi',
        Hi: 'hey',
        HowAreYa: 'howareya'
    }

    const originalBodyKeys = ['hey', 'hi', 'howAreYa'];

    const context = {
        url: '/api/players',
        body: [originalBody]
    }

    runMiddlewareWithContext(middleware, context)

    context.body.forEach(obj => Object.keys(obj).forEach(key => {
        t.true(originalBodyKeys.indexOf(key) > -1)
    }))
})

test('doesnt alter existing camelCased body', t => {
    const originalBody = {
        hey: 'hi',
        hi: 'hey',
        howAreYa: 'howareya'
    }

    const context = {
        url: '/api/players',
        body: originalBody
    }


    runMiddlewareWithContext(middleware, context);

    t.deepEqual(originalBody, context.body)
})