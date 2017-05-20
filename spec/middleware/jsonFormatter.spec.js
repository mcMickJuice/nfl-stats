const jsonFormatter = require('../../src/middleware/jsonFormatter')

let middleware;
beforeEach(() => {
    middleware = jsonFormatter();
})

const runMiddlewareWithContext = (middlewareFn, context) => {
    middlewareFn = middlewareFn.bind(context);
    const genFn = middlewareFn();
    //run to completion
    for (var i of genFn) { }
}

it('will not format calls not to /api', () => {
    const originalBody = {
        Hi: 'hey',
        HowAreYa: 'oh hi'
    }
    const context = {
        url: '',
        body: originalBody
    }

    runMiddlewareWithContext(middleware, context)

    expect(context.body).toEqual(originalBody)
})

it('will not throw if body is undefined', () => {
    const context = {
        url: '/api/players',
        body: undefined
    }

    expect(() => runMiddlewareWithContext(middleware, context)).not.toThrow()
})

it('format bodies of calls to /api', () => {
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

    expect(originalBody).not.toBe(context.body)
})

it('camelCase keys of response body', () => {
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
        expect(originalBodyKeys.indexOf(key) > -1).toBe(true)
    })
})

it('camelCase keys of response body if array', () => {
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
        expect(originalBodyKeys.indexOf(key) > -1).toBe(true)
    }))
})

it('doesnt alter existing camelCased body', () => {
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

    expect(originalBody).toEqual(context.body)
})