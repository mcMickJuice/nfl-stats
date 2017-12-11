const compose = (...fns) => {
  const reversed = fns.reverse()
  const firstFunc = reversed.shift()
  return val => {
    return reversed.reduce((prevVal, nextFn) => {
      return nextFn(prevVal)
    }, firstFunc(val))
  }
}

module.exports = compose
