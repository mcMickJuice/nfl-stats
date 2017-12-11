module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "jest/globals": true
  },
  "plugins": [
    "flowtype",
    "jest",
    "prettier"
  ],
  "extends": ["eslint:recommended", "plugin:flowtype/recommended"],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "prettier/prettier": "error"
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  }
};