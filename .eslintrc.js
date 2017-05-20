module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest/globals": true
    },
    "plugins": [
        "flowtype",
        "jest"
    ],
    "extends": ["eslint:recommended", "plugin:flowtype/recommended"],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ]
    },
    "settings": {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": true
        }
    }
};