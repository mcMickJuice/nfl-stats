const test = require('ava')
const jsonFormatter = require('../../src/middleware/jsonFormatter')

let middleware;
test.beforeEach(() => {
    middleware = jsonFormatter();
})

const runMiddlewareWithContext = async (middlewareFn, context) => {
    middlewareFn = middlewareFn.bind(context);
    const genFn = await middlewareFn();
    genFn.next();
    genFn.next();
}

test('will not format calls not to /api', async t => {
    const originalBody = {
        Hi: 'hey',
        HowAreYa: 'oh hi'
    }
    const context = {
        url: '',
        body: originalBody
    }

    await runMiddlewareWithContext(middleware, context)

    t.deepEqual(context.body, originalBody)
})

test('format bodies of calls to /api', async t => {
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

    await runMiddlewareWithContext(middleware, context)

    t.not(originalBody, context.body)
})

test('camelCase keys of response body', async t => {
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

    await runMiddlewareWithContext(middleware, context)

    Object.keys(context.body).forEach(key => {
        t.true(originalBodyKeys.indexOf(key) > -1)
    })
})

test('camelCase keys of response body if array', async t => {
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

    await runMiddlewareWithContext(middleware, context)

    context.body.forEach(obj => Object.keys(obj).forEach(key => {
        t.true(originalBodyKeys.indexOf(key) > -1)
    }))
})

test('doesnt alter existing camelCased body', async t => {
    const originalBody = {
        hey: 'hi',
        hi: 'hey',
        howAreYa: 'howareya'
    }

    const context = {
        url: '/api/players',
        body: originalBody
    }


    await runMiddlewareWithContext(middleware, context);

    t.deepEqual(originalBody, context.body)
})