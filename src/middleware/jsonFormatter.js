const jsonFormatter = options => {
  return function* formatterImpl(next) {
    yield next

    if (!this.url.startsWith('/api') || this.body == null) return

    if (Array.isArray(this.body)) {
      this.body = this.body.map(camelCaseObjectKeys)
    } else {
      this.body = camelCaseObjectKeys(this.body)
    }
  }
}

const camelCaseObjectKeys = obj => {
  return Object.keys(obj).reduce((acc, key) => {
    const val = obj[key]
    const newKey = camelCaseKey(key)

    return Object.assign({}, acc, {
      [newKey]: val
    })
  }, {})
}

const camelCaseKey = key => key.replace(/^([A-Z])/, (x, y) => y.toLowerCase())

module.exports = jsonFormatter
