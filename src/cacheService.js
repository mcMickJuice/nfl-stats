// @flow

const cache = {};

module.exports.addToCache = function addToCache<T>(key: string, entity: T): Promise<boolean> {
  cache[key] = entity;
  return Promise.resolve(true)
}

module.exports.getFromCache = function getFromCache<T>(key: string): Promise<T> {
  return Promise.resolve(cache[key]);
}

module.exports.existsInCache = function existsInCache(key: string): Promise<boolean> {
  return Promise.resolve(cache[key] != null);
}
